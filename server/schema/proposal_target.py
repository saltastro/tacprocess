import pandas as pd
from ..data.common import conn
from flask import g
from .target import Target


class ProposalTargets:
    proposal_code = None
    targets = []

    def get_targets_of_proposal(self):
        return self.targets

    def __init__(self, **args):
        targets = Target()
        dict_t_p = {}
        alltargets = targets.get_targets(**args)
        for t in alltargets:
            if t.of_proposal_code in dict_t_p:
                dict_t_p[t.of_proposal_code].append(t)
            else:
                dict_t_p[t.of_proposal_code] = [t]

        g.proposaltarget = dict_t_p