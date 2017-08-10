import graphene
from server.schema.parner import Partner
from server.data.parner import get_partner_of

from server.schema.proposal import Proposal
from server.data.proposal import get_proposals_of

from server.schema.target import Target
from server.data.target import get_targets_of


class Query(graphene.ObjectType):
    partners = graphene.Field(graphene.List(Partner), partner_code=graphene.String())
    # investigator = graphene.Field(Investigator, investigator_id=graphene.Int(), semester_id=graphene.Int())

    proposals = graphene.Field(graphene.List(Proposal), partner_code=graphene.String(), semester=graphene.String(),
                               investigator_email=graphene.String(), proposal_code=graphene.String())
    targets = graphene.Field(graphene.List(Target), target_name=graphene.String(), proposal_code=graphene.String(),
                             semester=graphene.String())
    # proposal_code_list=graphene.String())  #Todo a list of proposal code should be considered

    @graphene.resolve_only_args
    def resolve_partners(self, partner_code=None):
        return get_partner_of(partner_code)

    # @graphene.resolve_only_args
    # def resolve_investigator(self, investigator_id, semester_id=None):
    #     return get_investigator_of(investigator_id, semester_id)

    @graphene.resolve_only_args
    def resolve_proposals(self, semester, **args):
        return get_proposals_of(semester=semester, **args)

    @graphene.resolve_only_args
    def resolve_targets(self, semester, **args):
        """
        this method will return list of all targets in sdb and is any args are provided will return targets 
        that meet **args request
        :param args: Targets filtering arguments
        :param semester: 
        :return: list of targets
        """
        return get_targets_of(semester=semester, **args)


schema = graphene.Schema(query=Query)
