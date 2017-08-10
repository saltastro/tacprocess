import graphene
from flask import g
import pandas as pd
from graphene import relay as r, resolve_only_args
from .common import Semester, User, ObservingConditions, Thesis
from .target import Target
from ..data.common import get_user, get_p1_thesis, get_observing_conditions, conn


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
        allac_times = ProposalAllocations(
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


class Proposal(graphene.ObjectType): # is P1Proposal will need an interface Todo future
    # todo a query argument should be ab Enum if it can be Enum
    class Meta:
        interfaces = (r.Node,)

    # partner_id = graphene.Int()
    # proposal_id = graphene.ID()
    proposal_code = graphene.String()
    semester = graphene.String() # semester of submition
    title = graphene.String()
    is_p4 = graphene.Boolean()  # just p4
    phase = graphene.Int()
    status = graphene.String()  # Enum
    proposal_type = graphene.String()  # use Emun

    pi = graphene.Field(User)
    pc = graphene.Field(User)
    liaison_s_a = graphene.Field(User)
    time_requests = graphene.Int()

    proposal_time_allocations = graphene.Field(ProposalTimeAllocations)
    targets = graphene.Field(graphene.List(Target))
    # Todo add observations
    observing_conditions = graphene.Field(ObservingConditions)
    thesis = graphene.Field(graphene.List(Thesis)) #todo make plural
    # instrument = graphene.Field(Instruments) # TODO instuments make plural Inst is an InterFace
    # Todo in future investigators list

    @resolve_only_args
    def resolve_pi(self):
        return get_user(self.pi_id)

    @resolve_only_args
    def resolve_pc(self):
        return get_user(self.pc_id)

    @resolve_only_args
    def resolve_liaison_s_a(self):
        return get_user(self.liaison_s_a_id)

    @resolve_only_args
    def resolve_allocations(self):
        alloc = ProposalAllocations()
        return alloc.get_allocations(self.partner_id, self.proposal_code, self.semester_id)

    @resolve_only_args
    def resolve_targets(self):
        return Target().get_targets(proposal_code=self.proposal_code)

    @resolve_only_args
    def resolve_observing_conditions(self):
         return get_observing_conditions(proposal_code=self.proposal_code)

    @resolve_only_args
    def resolve_thesis(self):
        return get_p1_thesis(proposal_code=self.proposal_code)

    def _proposals_sql(self, **args):
        """
        
        :param args: 
        :return: SQl for selecting all proposals on **args filtering
        """
        proposal_ids_sql = " SELECT MAX(p.Proposal_Id) " \
                           "  FROM Proposal AS p " \
                           "    JOIN ProposalCode AS pc ON (p.ProposalCode_Id=pc.ProposalCode_Id) " \
                           "    JOIN MultiPartner AS mp ON (mp.Proposal_Id=p.Proposal_Id) " \
                           "  WHERE Phase=1 "
        if 'semester' in args:
            semester = Semester().get_semester(semester_code=args['semester'])
            proposal_ids_sql = proposal_ids_sql + " AND mp.Semester_Id = {semester_id} "\
                .format(semester_id=semester.semester_id)
        proposal_ids_sql = proposal_ids_sql + " GROUP BY pc.ProposalCode_Id "
        ids = pd.read_sql(proposal_ids_sql, conn)
        g.proposal_ids = (p_id for i, p_id in ids.iterrows())

        g.proposal_target = {}
        proposal_ids_sql = "SELECT Proposal_Id, Target_Id FROM ?? WHERE Proposal_Id in {proposal_id}"\
            .format(proposal_id=g.proposal_ids)

        sql = "SELECT Proposal_Code, CONCAT(SubmissionSemester.Year, '-', SubmissionSemester.Semester) as PSemester, " \
              " Title, P4,  Status, Phase, ProposalType," \
              " PI.FirstName, PI.Surname, PI.Email, PI.Phone, " \
              " PC.FirstName, PC.Surname, PC.Email, PI.Phone, " \
              " LA.FirstName, LA.Surname, PI.Email, LA.Phone, " \
              " ReqTimeAmount, "\
              "     FROM Proposal " \
              "         JOIN ProposalCode using (proposalCode_Id) " \
              "         join ProposalContact using (Proposal_Id) " \
              "         join Investigator on (Leader_Id=Investigator_Id) as PI " \
              "         join Investigator on (Contact_Id=Investigator_Id) as PC " \
              "         join Investigator on (Astronomer_Id=Investigator_Id) as LA " \
              "         join Semester on (Proposal.Semester_Id = Semester.Semester_Id) SubmissionSemester" \
              "         join MultiPartner using (Proposal_Id) " \
              "         join ProposalType using (ProposalType_Id) " \
              "         join Partner using (Partner_Id)" \
              "     join ProposalStatus using (ProposalStatus_Id) " \
              "" \
              "     WHERE Proposal_Id IN {proposal_ids} ".format(proposal_ids=g.proposal_ids)






    def get_proposals(self, **args):
        sql = self._proposals_sql(**args)

        return []

