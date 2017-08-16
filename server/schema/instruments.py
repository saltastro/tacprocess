"""
Instruments schema
"""

import graphene
from graphene import relay
import pandas as pd
from flask import g

from data.common import conn


class RssMask(graphene.ObjectType):
    mask_type = graphene.String()
    mos_description = graphene.String()

class FabryPerot(graphene.ObjectType):
    fabry_perot_mode = graphene.String()
    fabry_perot_description = graphene.String()
    etalon_config = graphene.String()

class Instrument(graphene.Interface):

    name = graphene.String()
    proposal_code = graphene.String()


    @staticmethod
    def _make_instrument(instrument):
        proposal_code = instrument['Proposal_Code']


        if not pd.isnull(instrument['P1Hrs_Id']):
            g.proposal_instruments.\
                setdefault(proposal_code, [])\
                .append(
                    Hrs(name='Hrs',
                        exposure_mode=instrument['ExposureMode']))

        if not pd.isnull(instrument['P1Bvit_Id']):
            g.proposal_instruments.setdefault(proposal_code, []).append(Bvit(name='Bvit'))

        if not pd.isnull(instrument['P1Rss_Id']):
            g.proposal_instruments.\
                setdefault(proposal_code, [])\
                .append(
                    Rss(name='Rss',
                        detector_mode=instrument['RssDetectorMode'],
                        xml_detector_mode=instrument['RssXmlDetectorMode'],
                        rss_mode=instrument['RssMode'],
                        rss_grading=instrument['RssGrating'],
                        mask=None if pd.isnull(instrument['RssMaskType']) else RssMask(
                            mask_type=instrument['RssMaskType'],
                            mos_description=instrument['RssMosDescription']),
                        fabry_perot=None if pd.isnull(instrument['RssFabryPerot_Mode']) else FabryPerot(
                            fabry_perot_mode=instrument['RssFabryPerot_Mode'],
                            fabry_perot_description=instrument['RssFabryPerot_Description'],
                            etalon_config=instrument['RssEtalonConfig']),
                        polarimetry=instrument['RssPatternName'],
                        ))

        if not pd.isnull(instrument['P1Salticam_Id']):
            g.proposal_instruments.\
                setdefault(proposal_code, [])\
                .append(
                    Salticam(name='Salticam',
                             detector_mode=instrument['ScamDetectorMode'],
                             xml_detector_mode=instrument['ScamXmlDetectorMode'],))

    @staticmethod
    def set_instruments(proposal_ids):
        """
        get a list of proposal Ids and get instruments used in all this proposals
        
        :param proposal_ids: 
        :return: 
        """
        sql = 'SELECT P1Salticam_Id, scd.DetectorMode as ScamDetectorMode, scd.XmlDetectorMode as ScamXmlDetectorMode, ' \
              ' P1Hrs_Id, ExposureMode, P1Bvit_Id, P1Rss_Id,  Proposal_Code, ' \
              ' rdm.DetectorMode as RssDetectorMode, rdm.XmlDetectorMode as RssXmlDetectorMode,  rm.Mode as RssMode, ' \
              ' rg.Grating as RssGrating, rma.MosDescription as RssMosDescription, rmt.RssMaskType as RssMaskType, ' \
              ' rfpm.FabryPerot_Mode as RssFabryPerot_Mode, rec.EtalonConfig as RssEtalonConfig, ' \
              ' rfpm.FabryPerot_Description as RssFabryPerot_Description, rpp.PatternName as RssPatternName ' \
              '    From P1Config as conf' \
              '     JOIN Proposal using(Proposal_Id)  ' \
              '     JOIN ProposalCode using(ProposalCode_Id)' \
              '     LEFT JOIN P1Hrs using(P1Hrs_Id) ' \
              '     LEFT JOIN HrsMode using(HrsMode_Id) ' \
              '     LEFT JOIN P1Bvit using(P1Bvit_Id) ' \
              '     LEFT JOIN BvitFilter using(BvitFilter_Id) ' \
              '     LEFT JOIN P1Salticam using(P1Salticam_Id) ' \
              '     LEFT JOIN SalticamDetectorMode as scd using(SalticamDetectorMode_Id) ' \
              '     LEFT JOIN P1Rss using(P1Rss_Id) ' \
              '     LEFT JOIN RssDetectorMode as rdm  using(RssDetectorMode_Id) ' \
              '     LEFT JOIN RssMode as rm using(RssMode_Id) ' \
              '     LEFT JOIN P1RssSpectroscopy using(P1RssSpectroscopy_Id) ' \
              '     LEFT JOIN RssGrating as rg using(RssGrating_Id) ' \
              '     LEFT JOIN P1RssMask as rma using(P1RssMask_Id) ' \
              '     LEFT JOIN RssMaskType as rmt using(RssMaskType_Id) ' \
              '     LEFT JOIN P1RssFabryPerot using(P1RssFabryPerot_Id) ' \
              '     LEFT JOIN RssFabryPerotMode as rfpm using(RssFabryPerotMode_Id) ' \
              '     LEFT JOIN RssEtalonConfig as rec using(RssEtalonConfig_Id) ' \
              '     LEFT JOIN P1RssPolarimetry using(P1RssPolarimetry_Id) ' \
              '     LEFT JOIN RssPolarimetryPattern as rpp using(RssPolarimetryPattern_Id) ' \
              '    WHERE Proposal_Id IN {proposal_ids} '.format(proposal_ids=proposal_ids)

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
    detector_mode = graphene.String()
    xml_detector_mode = graphene.String()


class Rss(graphene.ObjectType):
    class Meta:
        interfaces = (Instrument, relay.Node,)

    detector_mode = graphene.String()
    xml_detector_mode = graphene.String()
    rss_mode = graphene.String()
    rss_grading = graphene.String()
    mask = graphene.Field(RssMask)
    fabry_perot = graphene.Field(FabryPerot)
    polarimetry = graphene.String()
