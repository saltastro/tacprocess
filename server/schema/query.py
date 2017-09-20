from schema.proposals import *
from schema.targets import *
from data.common import Semester as TypeSemester
import graphene
from graphene import relay


class Query(graphene.ObjectType):
    node = relay.Node.Field()

    proposals = graphene.List(Proposal, semester=graphene.String())
    targets = graphene.List(P1ProposalTarget, semester=graphene.String())
    p1_observing_conditions = graphene.List(P1ObservingConditions)

    def resolve_proposals(self, context, info, args):
        query = Proposal.get_query(info)
        ids = Proposal.get_proposal_ids(semester=context['semester'])
        results = query.filter(Proposal.Proposal_Id.in_(ids)).all()
        return results

    def resolve_targets(self, context, info, args):

        if "semester" in context:
            type_semester = TypeSemester.get_semester(semester_code=context['semester'])
        else:
            raise ValueError("semester must be provided for querying all proposals")
        query = P1ProposalTarget.get_query(info)
        rest = query.filter_by().all()
        return rest


schema = graphene.Schema(query=Query, types=list_to_map)
