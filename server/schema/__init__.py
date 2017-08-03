import graphene as g
from server.schema.parner import Partner
from server.data.parner import get_partner_of

from server.schema.proposal import Proposal
from server.data.proposal import get_proposals_of

from server.schema.common import Semester
from server.data.common import get_semester_of


class Query(g.ObjectType):
    partners = g.Field(g.List(Partner), partner_code=g.String(), partner_name=g.String(), partner_id=g.Int())
    # investigator = g.Field(Investigator, investigator_id=g.Int(), semester_id=g.Int())
    proposals = g.Field(g.List(Proposal), investigator_id=g.Int(), partner_id=g.Int(), partner_code=g.String(),
                        semester_id=g.Int(), semester_code=g.String(), investigator_email=g.String(),
                        proposal_code=g.String())
    semester = g.Field(g.List(Semester), semester_code=g.String())

    # tac_stats =

    @g.resolve_only_args
    def resolve_partners(self, partner_id=None, partner_code=None, partner_name=None):
        return get_partner_of(partner_id, partner_code, partner_name)

    # @g.resolve_only_args
    # def resolve_investigator(self, investigator_id, semester_id=None):
    #     return get_investigator_of(investigator_id, semester_id)

    @g.resolve_only_args
    def resolve_proposals(self, investigator_id=None, partner_id=None, partner_code=None, semester_id=None,
                          semester_code=None, investigator_email=None, proposal_code=None):
        return get_proposals_of(investigator_id=investigator_id, partner_id=partner_id, partner_code=partner_code,
                                semester_id=semester_id, semester_code=semester_code,
                                investigator_email=investigator_email, proposal_code=proposal_code)

    @g.resolve_only_args
    def resolve_semester(self, semester_code=None):
        return get_semester_of(semester_code=semester_code)


schema = g.Schema(query=Query)
