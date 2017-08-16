import graphene
from flask import g
from schema.partner import Partner
from schema.proposal import Proposal
from data.proposal import get_proposals_of

from schema.target import Target
from schema.instruments import Hrs, Rss, Salticam, Bvit


class Query(graphene.ObjectType):
    """
    root and the only query that that can be made 
    returning only the results queried for in the structure described by user
    """

    # Three below are the queries from GraphQl
    partners = graphene.Field(graphene.List(Partner), partner_code=graphene.String())

    p1_proposals = graphene.Field(graphene.List(Proposal), partner_code=graphene.String(), semester=graphene.String(),
                                  investigator_email=graphene.String(), proposal_code=graphene.String())
    targets = graphene.Field(graphene.List(Target), target_name=graphene.String(), proposal_code=graphene.String(),
                             semester=graphene.String())

    @graphene.resolve_only_args
    def resolve_partners(self, **args):
        return Partner.get_partner(**args)

    @graphene.resolve_only_args
    def resolve_p1_proposals(self, semester, **args):
        g.target_cache = {}
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
        g.target_cache = {}
        return Target.get_targets_of(semester=semester, **args)


schema = graphene.Schema(query=Query, types=[Rss, Hrs, Salticam, Bvit])
