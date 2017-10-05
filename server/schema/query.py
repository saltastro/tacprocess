from schema.proposals import *
from schema.targets import *
from schema.instruments import *
from data.common import Semester as TypeSemester
import graphene
from graphene import relay

list_to_map = instruments_list + proposals_list + targets_list

class Query(graphene.ObjectType):
    node = relay.Node.Field()

    proposals = graphene.List(Proposal, semester=graphene.String())
    targets = graphene.List(P1ProposalTarget, semester=graphene.String())
    instruments = graphene.List(P1ProposalTarget, semester=graphene.String())
    p1_observing_conditions = graphene.List(P1ObservingConditions)

    def resolve_proposals(self, context, info, args):
        query = Proposal.get_query(info)
        ids = Proposal.get_proposal_ids(semester=context['semester'])
        results = query.filter(Proposal.Proposal_Id.in_(ids['ProposalIds'])).all() # : ids,
        return results

    def resolve_targets(self, context, info, args):
        query = Proposal.get_query(info)
        ids = Proposal.get_proposal_ids(semester=context['semester'])
        results = query.filter(Target.Proposal_Id.in_(ids)).all()
        return results

    def resolve_instruments(self, context, info, args):
        query = Proposal.get_query(info)
        ids = Proposal.get_proposal_ids(semester=context['semester'])
        results = query.filter(P1Config.ProposalCode_Id.in_(ids)).all()
        return results


schema = graphene.Schema(query=Query, types=list_to_map)
