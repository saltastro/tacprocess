from .proposal import get_proposal_ids


def get_targets_of(**args):
    from ..schema.target import Target
    get_proposal_ids(**args)
    targets = Target()

    return targets.get_targets()
