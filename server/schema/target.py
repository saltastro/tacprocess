import graphene as g
from graphene import relay as r, resolve_only_args
from ..data import conn
import pandas as pd

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
    dec = g.Float()


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

    name = g.String()
    requested_time = g.Int()
    optional = g.Boolean()
    max_lunar_phase = g.Float()
    coordinates = g.Field(TargetCoordinates)
    magnitudes = g.Field(TargetMagnitudes)
    sub_type = g.Field(TargetSubType)

    @staticmethod
    def _make_target_coordinates(coordinates):
        from astropy.coordinates import SkyCoord
        ra_str = str(coordinates['RaH']) + "h" + str(coordinates['RaM']) + "m" + str(coordinates['RaS']) + "s"
        dec_str = str(coordinates['DecSign']) + str(coordinates['DecD']) + "d" + str(coordinates['DecM']) + "m" + \
                  str(coordinates['DecS']) + "s"
        c = SkyCoord(ra=ra_str, dec=dec_str)

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
            ra=c.ra.degree,
            dec=c.dec.degree
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

        _target.name = target['Target_Name']
        _target.requested_time = target['RequestedTime']
        _target.optional = target['Optional']
        _target.max_lunar_phase = target['MaxLunarPhase']
        _target.sub_type = self._make_target_sub_type(target)
        _target.magnitudes = self._make_target_magnitudes(target)
        _target.coordinates = self._make_target_coordinates(target)
        return _target

    @staticmethod
    def _get_target_sql(**args):
        print(args)
        semester = Semester().get_semester(semester_code=args['semester'])
        sql = 'SELECT Target_Name, RequestedTime, Optional, MaxLunarPhase, ' \
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
              '         JOIN Semester using (MultiPartner.Semester_Id) ' \
              '    WHERE (CONCAT(Year, "_", Semester)= "{semester}" or CONCAT(Year, "-", Semester)= "{semester}") '\
            .format(semester=args['semester'])

        if "proposal_code" in args:
            sql = sql + ' AND Proposal_Code="{proposal_code}" '.format(proposal_code=args['proposal_code'])

        if "target_name" in args:
            if 'WHERE' in sql:
                sql = sql + ' and Target_Name = "{target_name}" '.format(target_name=args['target_name'])
        print(sql)
        return sql

    def get_targets(self, **args):
        """
        
        :param args: how the sql for queering proposals will be made 
        :return: list of Targets 
        """
        sql = self._get_target_sql(**args)
        results = pd.read_sql(sql, conn)

        return [self._make_target(targ) for index, targ in results.iterrows()]
