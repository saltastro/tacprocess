import graphene as g
from graphene import relay as r, resolve_only_args
from ..data import conn
import pandas as pd
from astropy.coordinates import SkyCoord
from datetime import datetime

from .common import Semester

import astropy.coordinates as coords
import astropy.units as u


class TargetCoordinates(g.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    equinox = g.Float()
    estrip_s = g.Float()
    estrip_e = g.Float()
    wstrip_s = g.Float()
    wstrip_e = g.Float()
    eaz_s = g.Float()
    eaz_e = g.Float()
    waz_s = g.Float()
    waz_e = g.Float()
    ra = g.Float()
    ra2 = g.Float()
    dec = g.Float()
    dec2 = g.Float()


class TargetMagnitudes(g.ObjectType):  # todo make singular
    class Meta:
        interfaces = (r.Node,)

    filter = g.String()  # _name
    min_magnitude = g.Int()
    max_magnitude = g.Int()


class TargetSubType(g.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    sub_type_numeric_code = g.String()
    sub_standard_name = g.String()
    sub_type = g.String()
    type_numeric_code = g.String()
    type = g.String()


class Target(g.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    of_proposal_code = g.String()
    name = g.String()
    requested_time = g.Int()
    optional = g.Boolean()
    max_lunar_phase = g.Float()
    coordinates = g.Field(TargetCoordinates)
    magnitudes = g.Field(TargetMagnitudes)
    sub_type = g.Field(TargetSubType)

    @staticmethod
    def _make_target_coordinates(coordinates):


        ra_str = str(coordinates['RaH']) + "h" + str(coordinates['RaM']) + "m" + str(coordinates['RaS']) + "s"
        dec_str = str(coordinates['DecSign']) + str(coordinates['DecD']) + "d" + str(coordinates['DecM']) + "m" + \
                  str(coordinates['DecS']) + "s"
        # c = SkyCoord(ra=ra_str, dec=dec_str)

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
            #ra=c.ra.degree,
            ra2=ra_,
            dec2=dec_,
            #dec=c.dec.degree
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
        _target.of_proposal_code = target['Proposal_Code']
        _target.name = target['Target_Name']
        _target.requested_time = target['RequestedTime']
        _target.optional = target['Optional']
        _target.max_lunar_phase = target['MaxLunarPhase']
        _target.sub_type = self._make_target_sub_type(target)
        _target.magnitudes = self._make_target_magnitudes(target)
        #st = datetime.now()
        _target.coordinates = self._make_target_coordinates(target)
        #print('skyCords:', datetime.now() - st)
        return _target

    @staticmethod
    def _get_target_sql(**args):
        semester = Semester().get_semester(semester_code=args['semester'])
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
              '         JOIN MultiPartner using (Proposal_Id)' \
              '    WHERE MultiPartner.Semester_Id = {semester}  '\
            .format(semester=semester.semester_id)
        #  '    WHERE (CONCAT(Year, "_", Semester)= "{semester}" or CONCAT(Year, "-", Semester)= "{semester}") '\

        if "proposal_code" in args:
            sql = sql + ' AND Proposal_Code="{proposal_code}" '.format(proposal_code=args['proposal_code'])

        if "target_name" in args:\
            sql = sql + ' and Target_Name = "{target_name}" '.format(target_name=args['target_name'])

        if "proposal_list" in args:
            sql = sql + " and Proposal_Code in {proposal_list}".format(proposal_list=args['proposal_list'])

        return sql

    def get_targets(self, **args):

        """
        
        :param args: how the sql for queering proposals will be made 
        :return: list of Targets 
        """
        s = datetime.now()
        sql = self._get_target_sql(**args)

        results = pd.read_sql(sql, conn)
        b = datetime.now()
        print("DB:", b - s)
        print("len to loop:", len(results['Target_Name'].values))
        res = [self._make_target(targ) for index, targ in results.iterrows()]
        en = datetime.now()
        print("End:", en - s)
        return res
