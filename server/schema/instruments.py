"""
Instruments schema
"""

import graphene
from graphene import relay
import pandas as pd
from flask import g

from data.common import conn


class Instrument(graphene.Interface):

    name = graphene.String()
    proposal_code = graphene.String()

    @staticmethod
    def _make_instrument(instrument):
        proposal_code = instrument['Proposal_Code']

        if instrument['ExposureMode'] is not None:
            g.proposal_instruments.setdefault(proposal_code,
                                              []).append(Hrs(name='Hrs',
                                                            exposure_mode=instrument['ExposureMode'] ))

        if not pd.isnull(instrument['P1Bvit_Id']):
            g.proposal_instruments.setdefault(proposal_code, []).append(Bvit(name='Bvit'))

        if not pd.isnull(instrument['P1Rss_Id']):
            g.proposal_instruments.setdefault(proposal_code, []).append(Rss(name='Rss'))

        if not pd.isnull(instrument['P1Salticam_Id']):
            g.proposal_instruments.setdefault(proposal_code, []).append(Salticam(name='Salticam'))


    @staticmethod
    def set_instruments(proposal_ids):
        """
        get a list of proposal Ids and get instruments used in all this proposals
        
        :param proposal_ids: 
        :return: 
        """
        sql = 'SELECT P1Salticam_Id, P1Rss_Id, P1Bvit_Id, ExposureMode, Proposal_Code from P1Config ' \
              '     JOIN Proposal using(Proposal_Id)  ' \
              '     JOIN ProposalCode using(ProposalCode_Id)' \
              '     LEFT JOIN P1Hrs using(P1Hrs_Id) ' \
              '     LEFT JOIN HrsMode using(HrsMode_Id) ' \
              '     LEFT JOIN P1Bvit using(P1Bvit_Id) ' \
              '     LEFT JOIN BvitFilter using(BvitFilter_Id) ' \
              '     WHERE Proposal_Id IN {proposal_ids} '.format(proposal_ids=proposal_ids)

        results = pd.read_sql(sql, conn)
        for i, inst in results.iterrows():
            Instrument._make_instrument(inst)


class Hrs(graphene.ObjectType):
    class Meta:
        interfaces = (Instrument, relay.Node)
    exposure_mode = graphene.String()


class Bvit(graphene.ObjectType):
    class Meta:
        interfaces = (Instrument, relay.Node)


class Salticam(graphene.ObjectType):
     class Meta:
         interfaces = (Instrument, relay.Node)


class Rss(graphene.ObjectType):
    class Meta:
        interfaces = (Instrument, relay.Node,)


def init_instruments():
    g.instrument_hrs = {}
    g.instrument_rss = {}
    g.instrument_bvit = {}
    g.instrument_scam = {}
    sql = 'SELECT P1Salticam_Id, P1Rss_Id, P1Bvit_Id, ExposureMode, Proposal_Code from P1Config ' \
          '     JOIN Proposal using(Proposal_Id)  ' \
          '     JOIN ProposalCode using(ProposalCode_Id)'\
          '     LEFT JOIN P1Hrs using(P1Hrs_Id) ' \
          '     LEFT JOIN HrsMode using(HrsMode_Id) ' \
          '     LEFT JOIN P1Bvit using(P1Bvit_Id) ' \
          '     LEFT JOIN BvitFilter using(BvitFilter_Id) ' \
          '     WHERE Proposal_Id IN {proposal_ids} '.format(proposal_ids=g.proposal_ids)
    print(sql)
    results = pd.read_sql(sql, conn)

    for i, inst in results.iterrows():
        proposal_code = inst['Proposal_Code']
        if inst['ExposureMode'] is not None:
            if proposal_code in g.instrument_hrs:
                g.instrument_hrs[proposal_code].append(Hrs(name='Hrs',
                                                   exposure_mode=inst['ExposureMode']))
            else:
                g.instrument_hrs[proposal_code] = [Hrs(name='Hrs',
                                                       exposure_mode=inst['ExposureMode'])
                                                   ]

        if inst['P1Bvit_Id'] is not None:
            if proposal_code in g.instrument_bvit:
                g.instrument_bvit[proposal_code].append(Bvit(name='Bvit'))
            else:
                g.instrument_bvit[proposal_code] = [Bvit(name='Bvit')]

        if inst['P1Rss_Id'] is not None:
            if proposal_code in g.instrument_rss:
                g.instrument_rss[proposal_code].append(Rss(name='Rss'))
            else:
                g.instrument_rss[proposal_code] = [Rss(name='Rss')]

        if inst['P1Salticam_Id'] is not None:
            if proposal_code in g.instrument_scam:
                g.instrument_scam[proposal_code].append(Salticam(name='Salticam'))
            else:
                g.instrument_scam[proposal_code] = [Salticam(name='Salticam')]














































# class Hrs(graphene.ObjectType):
#     class Meta:
#         interfaces = (Instruments, relay.Node)
#
#     exposure_mode = graphene.String()
#
#
# class Spectroscopy(graphene.ObjectType):
#     class Meta:
#         interfaces = (relay.Node,)
#     grating = graphene.String()
#
#
# class Mask(graphene.ObjectType):
#     class Meta:
#         interfaces = (relay.Node,)
#     mask_type = graphene.String()
#     mos_description = graphene.String()
#
#
# class FabryPerot(object):
#     pass


# class Rss(graphene.ObjectType):
#     class Meta:
#         interfaces = (Instrument, relay.Node,)
#
#     detector_mode = graphene.String()
#     mode = graphene.String()
#     spectroscopy = graphene.Field(Spectroscopy)
#     mask = graphene.Field(Mask)
#     fabry_perot = graphene.Field(FabryPerot)
#
#
# class Bvit(graphene.ObjectType):
#     class Meta:
#         interfaces = (Instrument, relay.Node)
#
#
#