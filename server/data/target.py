from .proposal import get_proposal_ids


def get_targets_of(**args):
    from ..schema.target import Target
    proposal_ids = get_proposal_ids(**args)

    return Target.get_targets(proposal_ids)
