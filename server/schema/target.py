import graphene
from flask import g
from graphene import relay as r, resolve_only_args
from data import conn
import pandas as pd
from datetime import datetime

from .common import Semester


class TargetCoordinates(graphene.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    equinox = graphene.Float()
    estrip_s = graphene.Float()
    estrip_e = graphene.Float()
    wstrip_s = graphene.Float()
    wstrip_e = graphene.Float()
    eaz_s = graphene.Float()
    eaz_e = graphene.Float()
    waz_s = graphene.Float()
    waz_e = graphene.Float()
    ra = graphene.Float()
    dec = graphene.Float()


class TargetMagnitudes(graphene.ObjectType):  # todo make singular
    class Meta:
        interfaces = (r.Node,)

    filter = graphene.String()  # _name
    min_magnitude = graphene.Int()
    max_magnitude = graphene.Int()


class TargetSubType(graphene.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    sub_type_numeric_code = graphene.String()
    sub_standard_name = graphene.String()
    sub_type = graphene.String()
    type_numeric_code = graphene.String()
    type = graphene.String()


class Target(graphene.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    proposal_code = graphene.String()
    name = graphene.String()
    requested_time = graphene.Int()
    optional = graphene.Boolean()
    max_lunar_phase = graphene.Float()
    coordinates = graphene.Field(TargetCoordinates)
    magnitudes = graphene.Field(TargetMagnitudes)
    sub_type = graphene.Field(TargetSubType)

    @staticmethod
    def _make_target_coordinates(coordinates):

        ra_ = (coordinates['RaH'] + coordinates['RaM']/60 + coordinates['RaS']/3600)/(24/360)
        sign = -1 if coordinates['DecSign'] == '-' else 1
        dec_ = sign*(coordinates['DecD'] + coordinates['DecM']/60 + coordinates['DecS']/3600)

        return TargetCoordinates(
            equinox=coordinates['Equinox'],
            estrip_s=coordinates['EstripS'],
            estrip_e=coordinates['EstripE'],
            wstrip_s=coordinates['WstripS'],
            wstrip_e=coordinates['WstripE'],
            eaz_s=coordinates['EazS'],
            eaz_e=coordinates['EazE'],
            waz_s=coordinates['WazS'],
            waz_e=coordinates['WazE'],
            ra=ra_,
            dec=dec_,
        )

    @staticmethod
    def _make_target_magnitudes(magnitude):

        return TargetMagnitudes(
            filter=magnitude['FilterName'],
            min_magnitude=magnitude['MinMag'],
            max_magnitude=magnitude['MaxMag'])

    @staticmethod
    def _make_target_sub_type(sub_type):
        return TargetSubType(
            sub_type_numeric_code=sub_type['SubNumericCode'],
            sub_standard_name=sub_type['StandardName'],
            sub_type=sub_type['TargetSubType'],
            type_numeric_code=sub_type['TypeNumericCode'],
            type=sub_type['TargetType']
        )

    def _make_target(self, target):
        """
        method is only called with in the
        :param target:
        :return:
        """
        _target = Target()
        _target.proposal_code = target['Proposal_Code']
        _target.name = target['Target_Name']
        _target.requested_time = target['RequestedTime']
        _target.optional = target['Optional']
        _target.max_lunar_phase = target['MaxLunarPhase']
        _target.sub_type = self._make_target_sub_type(target)
        _target.magnitudes = self._make_target_magnitudes(target)
        _target.coordinates = self._make_target_coordinates(target)
        #print('skyCords:', datetime.now() - st)
        return _target

    @staticmethod
    def _get_target_sql():
        sql = 'SELECT Target_Name, RequestedTime, Optional, MaxLunarPhase, Proposal_Code, ' \
              '   RaH, RaM, RaS, DecSign, DecD, DecM, DecS, Equinox, EstripE, EstripS, WstripS, WstripE, EazS, EazE, ' \
              '       WazS, WazE, FilterName, MinMag, MaxMag, TargetSubType.NumericCode as SubNumericCode, ' \
              '       StandardName, TargetSubType, TargetType.NumericCode as TypeNumericCode, TargetType.TargetType' \
              '     FROM P1ProposalTarget ' \
              '         JOIN Target using (Target_Id) ' \
              '         JOIN Proposal using (Proposal_Id) ' \
              '         JOIN ProposalCode using (ProposalCode_Id) ' \
              '         JOIN TargetCoordinates using(TargetCoordinates_Id) ' \
              '         JOIN TargetMagnitudes using(TargetMagnitudes_Id) JOIN Bandpass using(Bandpass_Id) ' \
              '         JOIN TargetSubType using (TargetSubType_Id) JOIN TargetType USING(TargetType_Id) ' \
              '    WHERE Proposal.Proposal_Id IN {proposal_id}  '\
            .format(proposal_id=g.proposal_ids)

        return sql

    def get_targets(self):

        """

        :param args: how the sql for queering proposals will be made
        :return: list of Targets
        """
        s = datetime.now()
        sql = self._get_target_sql()
        print("target:", sql)

        results = pd.read_sql(sql, conn)
        b = datetime.now()
        print("DB:", b - s)
        print("len to loop:", len(results['Target_Name'].values))
        res = [self._make_target(targ) for index, targ in results.iterrows()]
        en = datetime.now()
        print("End:", en - s)
        return res
