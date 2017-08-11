from . import pd, conn
from flask import g
#from .common import get_semester
from ..schema.common import Semester


proposal_data = {}


def make_proposal(prop):
    """
    partner_id = g.Int()
    proposal_id = g.ID()
    proposal_code = g.String()
    semester_id = g.Int()
    semester = g.Field(Semester)
    title = g.String()
    pi_id = g.Int()
    pc_id = g.Int()
    liaison_s_a_id = g.Int()
    pi = g.Field(User)
    pc = g.Field(User)
    # timeAllocations = g.Field(TimeAllocation, description="A user object")  # ** was a list **
    time_requested = g.Int()  # ** was a list **
    # warnings = g.String()   # ** was a list **

    liaison_s_a = g.Field(User)
    allocations = g.Field(ProposalAllocations)
    :param prop: 
    :return: 
    """
    from ..schema.proposal import Proposal
    prop_ = Proposal(
        proposal_id=prop['Proposal_Id'],
        partner_id=prop['Partner_Id'],
        proposal_code=prop['Proposal_Code'],
        semester=prop['PSemester'],
        semester_id=prop['Semester_id'],
        title=prop['Title'],
        pi_id=prop['PI_Id'],
        pc_id=prop['PC_ID'],
        proposal_type=prop['ProposalType'],
        # time_allocations=prop[''], # ** was a list **
        total_time_requested=prop['ReqTimeAmount'],  # ** was a list **
        # warnings=prop[''],  # ** was a list **
        liaison_s_a_id=prop['Astronomer_Id'],
        p4=prop['P4'],
        phase=prop['Phase'],
        status=prop['Status']
        #is_thesis=True,
        #thesis=make_thesis(prop)
    )
    return prop_


def proposal_sql(arguments):
    sql = "SELECT DISTINCT Proposal_Id, Proposal_Code, MultiPartner.Semester_Id as Semester_id, Title, P4, " \
          " CONCAT(Year, '-', Semester) as PSemester, MultiPartner.Semester_Id as Semester_Id, " \
          " MultiPartner.Partner_Id as Partner_Id, Investigator.Email as PI_Email, ProposalType, " \
          " Investigator.Investigator_Id as PI_Id, Contact_Id as PC_ID, ReqTimeAmount, Astronomer_Id, Status, Phase " \
          " from Proposal " \
          "     join ProposalCode using (ProposalCode_Id) " \
          "     join ProposalContact using (Proposal_Id) " \
          "     join Investigator on (Leader_Id=Investigator_Id) " \
          "     join Semester using (Semester_Id) " \
          "     join MultiPartner using (Proposal_Id) " \
          "     join ProposalType using (ProposalType_Id) " \
          "     join Partner using (Partner_Id) " \
          "     join ProposalStatus using (ProposalStatus_Id) " \
          "  where current=1 "

    sql = "SELECT *, Proposal_Id, Proposal_Code, " \
          " CONCAT(Year, '-', Semester) as PSemester, MultiPartner.Semester_Id as Semester_id, " \
          " Title, P4,  Status, Phase, " \
          " MultiPartner.Partner_Id as Partner_Id, Investigator.Email as PI_Email, ProposalType, " \
          " Investigator.Investigator_Id as PI_Id, Contact_Id as PC_ID, ReqTimeAmount, Astronomer_Id  " \
          "     FROM Proposal " \
          "         JOIN ProposalCode using (proposalCode_Id) " \
          "         join ProposalContact using (Proposal_Id) " \
          "         join Investigator on (Leader_Id=Investigator_Id) " \
          "         join Semester using (Semester_Id) " \
          "         join MultiPartner using (Proposal_Id) " \
          "         join ProposalType using (ProposalType_Id) " \
          "         join Partner using (Partner_Id)" \
          "     join ProposalStatus using (ProposalStatus_Id) " \
          "" \
          "     WHERE Proposal_Id IN ( " \
          "           SELECT MAX(p.Proposal_Id) " \
          "                  FROM Proposal AS p " \
          "                         JOIN ProposalCode AS pc ON (p.ProposalCode_Id=pc.ProposalCode_Id) " \
          "                         JOIN MultiPartner AS mp ON (mp.Proposal_Id=p.Proposal_Id) " \
          "                  WHERE Phase=1" \
          "                  GROUP BY pc.ProposalCode_Id" \
          "    ) "

    if 'partner_id' in arguments and arguments['partner_id'] is not None:
        sql = sql + " and Partner_Id={} ".format(arguments['partner_id'])
    if 'partner_code' in arguments and arguments['partner_code'] is not None:
        sql = sql + " and Partner_Code='{}' ".format(arguments['partner_code'])
    if 'partner_name' in arguments and arguments['partner_name'] is not None:
        sql = sql + " and Partner_Name='{}' ".format(arguments['partner_name'])
    if 'proposal_id' in arguments and arguments['proposal_id'] is not None:
        sql = sql + " and Proposal_Id={} ".format(arguments['proposal_id'])
    if 'proposal_code' in arguments and arguments['proposal_code'] is not None:
        sql = sql + " and Proposal_Code='{}' ".format(arguments['proposal_code'])
    if 'semester_id' in arguments and arguments['semester_id'] is not None:
        sql = sql + " and MultiPartner.Semester_Id={} ".format(arguments['semester_id'])
    if 'semester_code' in arguments and arguments['semester_code'] is not None:
        sem = Semester().get_semester(semester_code=arguments['semester_code'])
        sql = sql + " and MultiPartner.Semester_Id={} ".format(sem.semester_id)
    if 'investigator_id' in arguments and arguments['investigator_id'] is not None:
        sql = sql + " and Investigator.Investigator_Id={} ".format(arguments['investigator_id'])
    if 'investigator_email' in arguments and arguments['investigator_email'] is not None:
        sql = sql + " and Investigator.Email='{}' ".format(arguments['investigator_email'])
    if 'proposal_code' in arguments and arguments['proposal_code'] is not None:
        sql = sql + " and Proposal_Code='{}' ".format(arguments['proposal_code'])
    print(sql)

    return sql + " and not (Status  = 'Deleted' or Status = 'Expired') " + " ORDER BY Proposal_Code"


def get_proposal(**arguments):
    """
    <N.B If semester not provided the current semester is used>
    :param proposal_id: 
    :param partner_id: 
    :param semester_id: Default is an active semester 
    :return: 
    """
    if "semester_id" not in arguments:
        Semester().get_semester(id_only=True, active=True)

    sql = proposal_sql(arguments)  # todo create sql who the user is and what they can see

    results = pd.read_sql(sql, conn)

    proposals = [make_proposal(prop) for index, prop in results.iterrows()]
    return proposals


def setup_proposals(investigator_id, partner_id, partner_code, semester_id, semester_code, investigator_email,
                    proposal_code):
    global proposal_data
    proposal_ = get_proposal(investigator_id=investigator_id, partner_id=partner_id, partner_code=partner_code,
                             semester_id=semester_id, semester_code=semester_code, proposal_code=proposal_code,
                             investigator_email=investigator_email)
    proposal_data = {"proposals": proposal_}


def get_proposals_of(**args):
    from ..schema.proposal import Proposal
    proposals = Proposal()
    p = proposals.get_proposals(**args)
    print("#", len(g.proposal_ids), list(g.proposal_ids))
    print("PROP#", len(p))
    return p
