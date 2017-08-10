from flask import g


def get_targets_of(**args):
    from ..schema.target import Target

    targets = Target()
    if 'proposal_code_list' in args:
        args['proposal_code_list'] = [prop for prop in args['proposal_code_list'].split(sep=', ')]


    return targets.get_targets(**args)
