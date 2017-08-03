import graphene as g
from graphene import relay as r, resolve_only_args
from .common import User, ObservingConditions, P1Thesis, TimeDistributions
from .target import Target
from ..data.common import get_user


class ProposalAllocations(g.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    p0 = g.Int()
    p1 = g.Int()
    p2 = g.Int()
    p3 = g.Int()
    p4 = g.Int()


class Proposal(g.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    partner_id = g.Int()
    proposal_id = g.ID()
    proposal_code = g.String()
    semester_id = g.Int()
    semester = g.String()
    title = g.String()
    pi_id = g.Int()
    pc_id = g.Int()
    liaison_s_a_id = g.Int()
    pi = g.Field(User)
    pc = g.Field(User)
    proposal_type = g.String()
    total_time_requested = g.Int()  # ** was a list **
    p4 = g.Boolean()
    phase = g.Int()
    status = g.String()
    # TODO remember to add a thesis field must find where it is

    liaison_s_a = g.Field(User)
    allocations = g.Field(ProposalAllocations)
    targets = g.Field(g.List(Target))
    observing_conditions = g.Field(ObservingConditions)
    number_of_targets = g.Int()
    thesis = g.Field(g.List(P1Thesis))
    # instrument = g.Field(Instruments)

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
        return get_allocations(self.partner_id, self.proposal_code, self.semester_id)

    @resolve_only_args
    def resolve_targets(self):
        return Target().get_targets(proposal_code=self.proposal_code)

    @resolve_only_args
    def resolve_observing_conditions(self):
         return get_observing_conditions(proposal_code=self.proposal_code)

    @resolve_only_args
    def resolve_thesis(self):
        return get_p1_thesis(proposal_code=self.proposal_code)

