import graphene as g
from graphene import relay as r, resolve_only_args
from ..data import conn
import pandas as pd


class TargetCoordinates(g.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    TargetCoordinates_Id = g.ID()
    ra_h = g.Int()
    ra_m = g.Int()
    ra_s = g.Int()
    dec_sign = g.String()
    dec_d = g.Int()
    dec_m = g.Int()
    dec_s = g.Int()
    equinox = g.Int()
    estrip_s = g.Float()
    estrip_e = g.Float()
    wstrip_s = g.Float()
    wstrip_e = g.Float()
    eaz_s = g.Float()
    eaz_e = g.Float()
    waz_s = g.Float()
    waz_e = g.Float()


class TargetMagnitudes(g.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    TargetMagnitudes_Id = g.ID()
    filter_name = g.String()
    MinMag = g.Int()
    MaxMag = g.Int()


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

    target_id = g.ID()
    name = g.String()
    coordinates_id = g.Int()
    magnitudes_id = g.Int()
    sub_type_id = g.Int()
    moving_target_id = g.Int()
    periodic_target_id = g.Int()
    Horizons_target_id = g.Int()
    requested_time = g.Int()
    optional = g.Boolean()
    max_lunar_phase = g.Float()
    coordinates = g.Field(TargetCoordinates)
    magnitudes = g.Field(TargetMagnitudes)
    sub_type = g.Field(TargetSubType)

    @resolve_only_args
    def resolve_coordinates(self):
        return self.get_target_coordinates(self.coordinates_id)

    @resolve_only_args
    def resolve_magnitudes(self):
        return self.get_target_magnitudes(self.magnitudes_id)

    @resolve_only_args
    def resolve_sub_type(self):
        return self.get_target_sub_type(self.sub_type_id)

    def get_target_coordinates(self, coordinates_id):
        sql = "SELECT * FROM TargetCoordinates WHERE TargetCoordinates_Id={}".format(coordinates_id)

        results = pd.read_sql(sql, conn)
        return TargetCoordinates(
            TargetCoordinates_Id=results['TargetCoordinates_Id'],
            ra_h=results['RaH'],
            ra_m=results['RaM'],
            ra_s=results['RaS'],
            dec_sign=results['DecSign'],
            dec_d=results['DecD'],
            dec_m=results['DecM'],
            dec_s=results['DecD'],
            equinox=results['Equinox'],
            estrip_s=results['EstripS'],
            estrip_e=results['EstripE'],
            wstrip_s=results['WstripS'],
            wstrip_e=results['WstripE'],
            eaz_s=results['EazS'],
            eaz_e=results['EazE'],
            waz_s=results['WazS'],
            waz_e=results['WazE']
        )

    def get_target_magnitudes(self, magnitude_id):

        sql = "SELECT * FROM TargetMagnitudes JOIN Bandpass using(Bandpass_Id) WHERE TargetMagnitudes_Id = {}" \
            .format(magnitude_id)
        results = pd.read_sql(sql, conn)

        return TargetMagnitudes(
            TargetMagnitudes_Id=results['TargetMagnitudes_Id'],
            filter_name=results['FilterName'][0],
            MinMag=results['MinMag'],
            MaxMag=results['MaxMag'])

    def get_target_sub_type(self, sub_id):

        sql = 'SELECT  TargetSubType.NumericCode as SubNumericCode, StandardName, TargetSubType, ' \
              ' TargetType.NumericCode as TypeNumericCode, TargetType' \
              '     FROM TargetSubType JOIN TargetType USING(TargetType_Id) WHERE TargetSubType_Id={} '.format(sub_id)
        results = pd.read_sql(sql, conn)
        return TargetSubType(
            sub_type_numeric_code=results['SubNumericCode'][0],
            sub_standard_name=results['StandardName'][0],
            sub_type=results['TargetSubType'][0],
            type_numeric_code=results['TypeNumericCode'][0],
            type=results['TargetType'][0]
        )

    def get_targets(self, proposal_code=None):
        sql = 'SELECT * ' \
              '     FROM P1ProposalTarget ' \
              '         JOIN Target using (Target_Id) ' \
              '         JOIN Proposal using (Proposal_Id) ' \
              '         JOIN ProposalCode using (ProposalCode_Id) ' \
              '     WHERE Proposal_Code="{proposal_code}" '.format(proposal_code=proposal_code)

        results = pd.read_sql(sql, conn)

        return [self._make_target(targ) for index, targ in results.iterrows()]

    def _make_target(self, target):
        _target = Target()
        _target.target_id = target['Target_Id']
        _target.name = target['Target_Name']
        _target.coordinates_id = target['TargetCoordinates_Id']
        _target.magnitudes_id = target['TargetMagnitudes_Id']
        _target.sub_type_id = target['TargetSubType_Id']
        _target.moving_target_id = target['MovingTarget_Id']
        _target.periodic_target_id = target['PeriodicTarget_Id']
        _target.Horizons_target_id = target['HorizonsTarget_Id']
        _target.requested_time = target['RequestedTime']
        _target.optional = target['Optional']
        _target.max_lunar_phase = target['MaxLunarPhase']
        return _target