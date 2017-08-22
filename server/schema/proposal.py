import graphene
from flask import g
import pandas as pd
from graphene import relay as r, resolve_only_args
from .common import Semester, Person, ObservingConditions, Thesis
from .target import Target
from data.common import get_user, get_p1_thesis, get_observing_conditions, conn
from data.proposal import get_proposal_ids
from .instruments import Instrument


class ProposalTimeAllocations(graphene.ObjectType):  # todo make singular
    class Meta:
        interfaces = (r.Node,)
    # TODO real check this same proposal can have different time allocated from different partners and
    # different semmester
    p0 = graphene.Int()
    p1 = graphene.Int()
    p2 = graphene.Int()
    p3 = graphene.Int()
    p4 = graphene.Int()

    @staticmethod
    def _make_allocation(prio_dict):
        allac_times = ProposalTimeAllocations(
            p0=prio_dict['p0'],
            p1=prio_dict['p1'],
            p2=prio_dict['p2'],
            p3=prio_dict['p3'],
            p4=prio_dict['p4']
        )
        return allac_times

    def get_allocations(self, partner_id, proposal_id, semester_id=None):

        if semester_id is None:
            semester_id = " "
        else:
            semester_id = " AND MultiPartner.Semester_Id = {}".format(semester_id)
        p_times = {
            'p0': 0,
            'p1': 0,
            'p2': 0,
            'p3': 0,
            'p4': 0
        }

        sql = "SELECT DISTINCT Priority, TimeAlloc, MultiPartner.Semester_Id as MSem_Id " \
              "  FROM Proposal " \
              "     JOIN MultiPartner USING(Proposal_Id) " \
              "     JOIN PriorityAlloc using(MultiPartner_Id) " \
              "     JOIN ProposalCode using(ProposalCode_Id)" \
              "  WHERE  Partner_Id={partner_id} " \
              "     AND Proposal_Code='{proposal_id}'" \
              "     {semester_id}" \
            .format(partner_id=partner_id, semester_id=semester_id, proposal_id=proposal_id)

        result = pd.read_sql(sql, conn)
        for prio, alloc in zip(list(result['Priority']), list(result['TimeAlloc'])):
            key = "p" + str(prio)
            p_times[key] = alloc
        return self._make_allocation(p_times)


class TimeRequests(graphene.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    time_request = graphene.Int()
    semester = graphene.String()
    partner_code = graphene.String()

    def get_time_requests(self):
        return []


def _init_time_requests():
    all_requests = TimeRequests().get_time_requests()
    dict_proposal_requests = {}
    for request in all_requests:
        if request.proposal_code in dict_proposal_requests:
            dict_proposal_requests[request.proposal_code].append(request)
        else:
            dict_proposal_requests[request.proposal_code] = [request]
    g.proposal_requests = dict_proposal_requests


class Proposal(graphene.ObjectType): # is P1Proposal will need an interface Todo future
    # todo a query argument should be ab Enum if it can be Enum

    # partner_id = graphene.Int()
    id = graphene.ID()
    proposal_code = graphene.String()
    semester = graphene.String()  # semester of submition
    title = graphene.String()
    is_p4 = graphene.Boolean()  # just p4
    phase = graphene.Int()
    status = graphene.String()  # Enum
    proposal_type = graphene.String()  # use Emun

    pi = graphene.Field(Person)
    pc = graphene.Field(Person)
    liaison_s_a = graphene.Field(Person)

    time_requests = graphene.Field(graphene.List(TimeRequests))

    proposal_time_allocations = graphene.Field(ProposalTimeAllocations)
    targets = graphene.Field(graphene.List(Target))
    # Todo add observations
    observing_conditions = graphene.Field(ObservingConditions)
    thesis = graphene.Field(graphene.List(Thesis))
    instruments = graphene.Field(graphene.List(Instrument))
    # Todo in future investigators list

    # @resolve_only_args
    # def resolve_pi(self):
    #     return get_user(self.pi_id)
    #
    # @resolve_only_args
    # def resolve_pc(self):
    #     return get_user(self.pc_id)
    #
    # @resolve_only_args
    # def resolve_liaison_s_a(self):
    #     return get_user(self.liaison_s_a_id)
    #
    # @resolve_only_args
    # def resolve_allocations(self):
    #     alloc = ProposalAllocations()
    #     return alloc.get_allocations(self.partner_id, self.proposal_code, self.semester_id)
    #
    @resolve_only_args
    def resolve_targets(self):
        return g.proposal_targets.get(self.proposal_code)

    @resolve_only_args
    def resolve_instruments(self):
        return g.proposal_instruments.get(self.proposal_code)

    @staticmethod
    def _proposals_sql(proposal_ids):
        """

        :param args:
        :return: SQl for selecting all proposals on **args filtering
        """
        sql = "SELECT distinct Proposal_Code, Proposal_Id, " \
              " CONCAT(SubmissionSemester.Year, '-', SubmissionSemester.Semester) as PSemester, " \
              " Title, P4,  Status, Phase, ProposalType," \
              " PI.FirstName as PIF, PI.Surname as PIS, PI.Email as PIE, PI.Phone as PIP, " \
              " PC.FirstName as PCF, PC.Surname as PCS, PC.Email as PCE, PI.Phone as PCP, " \
              " LA.FirstName AS LAF, LA.Surname AS LAS, LA.Email AS LAE, LA.Phone AS LAP, " \
              "  " \
              " MaxSeeing, ObservingConditionsDescription, Transparency, ProposalType as Proposal_Type " \
              "     FROM Proposal " \
              "         JOIN ProposalCode using (proposalCode_Id) " \
              "         join ProposalContact using (Proposal_Id) " \
              "         join Investigator as PI on (Leader_Id=PI.Investigator_Id)  " \
              "         join Investigator as PC on (Contact_Id=PC.Investigator_Id) " \
              "         left join Investigator as LA on (Astronomer_Id=LA.Investigator_Id) " \
              "         join Semester as SubmissionSemester on (Proposal.Semester_Id=SubmissionSemester.Semester_Id) " \
              "         join MultiPartner using (Proposal_Id) " \
              "         join ProposalType using (ProposalType_Id) " \
              "         join Partner using (Partner_Id) " \
              "         join ProposalStatus using (ProposalStatus_Id) " \
              "         join P1ObservingConditions using (Proposal_Id) " \
              "         join Transparency using (Transparency_Id) " \
              "     WHERE Proposal_Id IN {proposal_ids} ".format(proposal_ids=proposal_ids)
        return sql + "order by Proposal_Code"

    def get_proposals(self, **args):
        proposal_ids = get_proposal_ids(**args)
        sql = self._proposals_sql(proposal_ids)
        proposal_data = pd.read_sql(sql, conn)

        self._init_targets(proposal_ids)
        self._init_instruments(proposal_ids)

        proposals = [self._make_proposal(proposal) for i, proposal in proposal_data.iterrows()]

        return proposals

    def _make_proposal(self, proposal):
        proposal_ = Proposal()

        proposal_.id = "Proposal:" + str(proposal['Proposal_Id'])
        proposal_.proposal_code = proposal['Proposal_Code']
        proposal_.semester = proposal['PSemester']  # semester of submition
        proposal_.title = proposal['Title']
        proposal_.is_p4 = proposal['P4']
        proposal_.phase = proposal['Phase']
        proposal_.status = proposal['Status']  # Enum
        proposal_.proposal_type = proposal['Proposal_Type']  # use Emun

        proposal_.pi = self._make_person(last_name=proposal['PIS'], first_name=proposal['PIF'],
                                         email=proposal['PIE'], phone=proposal['PIP'])
        proposal_.pc = self._make_person(last_name=proposal['PCS'], first_name=proposal['PCF'],
                                         email=proposal['PCE'], phone=proposal['PCP'])
        proposal_.liaison_s_a = self._make_person(last_name=proposal['LAS'], first_name=proposal['LAF'],
                                                  email=proposal['LAE'], phone=proposal['LAP'])
        # proposal_.time_requests = proposal['ReqTimeAmount']

        #proposal_.proposal_time_allocations =
        #proposal_.targets = proposal['']
        # Todo add observations
        proposal_.observing_conditions = self._make_observing_conditions(proposal)
        # proposal_.thesis = self._make_thesis(proposal)  # todo make pl
        return proposal_

    def _make_person(self, last_name, first_name, email, phone):
        return Person(
            surname=last_name, first_name=first_name, email=email, phone=phone
        )

    def _make_thesis(self, thesis):
        if thesis['ThesisType'] is not None:
            return Thesis(
                thesis_type=thesis['ThesisType'],
                thesis_description=thesis['ThesisDescr'],
                student=self._make_person(last_name=thesis['STS'], first_name=thesis['STF'],
                                          email=thesis['STE'], phone=thesis['STP'])
            )
        return None

    def _make_observing_conditions(self, conditions):
        return ObservingConditions(
            max_seeing=conditions['MaxSeeing'],
            transparency=conditions['Transparency'],
            description=conditions['ObservingConditionsDescription']
        )

    @staticmethod
    def _init_targets(proposal_ids):

        all_targets = Target.get_targets(proposal_ids)
        dict_proposal_targets = {}
        for target in all_targets:
            if target.proposal_code in dict_proposal_targets:
                dict_proposal_targets[target.proposal_code].append(target)
            else:
                dict_proposal_targets[target.proposal_code] = [target]
        g.proposal_targets = dict_proposal_targets

    @staticmethod
    def _init_instruments(proposal_ids):
        g.proposal_instruments = {}
        Instrument.set_instruments(proposal_ids)
