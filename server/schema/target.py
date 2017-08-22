import graphene
from flask import g
from graphene import relay as r
from data import conn
import pandas as pd


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


class TargetMagnitude(graphene.ObjectType):
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
    """
    Target graphene object type
    """

    id = graphene.ID()
    proposal_code = graphene.String()
    name = graphene.String()
    requested_time = graphene.Int()
    optional = graphene.Boolean()
    max_lunar_phase = graphene.Float()
    coordinates = graphene.Field(TargetCoordinates)
    magnitude = graphene.Field(TargetMagnitude)
    sub_type = graphene.Field(TargetSubType)

    @staticmethod
    def __make_target_coordinates(coordinates):
        """
        is a private method that is only called by private method make_target()
        <NB> this methods must not be called anywhere or be called by any method <NB>
        :param coordinates: a row from the query results of target
        :return: Target Coord class mapped
        """
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
    def __make_target_magnitudes(magnitude):
        """
        is a private method that is only called by private method make_target()
        <NB> this methods must not be called anywhere or be called by any method <NB>
        :param magnitude: a row from the query results of target
        :return: Target Magnitude class mapped
        """
        return TargetMagnitude(
            filter=magnitude['FilterName'],
            min_magnitude=magnitude['MinMag'],
            max_magnitude=magnitude['MaxMag'])

    @staticmethod
    def __make_target_sub_type(sub_type):
        """
        is a private method that is only called by private method make_target()
        <NB> this methods must not be called anywhere or be called by any method <NB>
        :param sub_type: a row from the query results of target
        :return: Target Sub Type class mapped
        """
        return TargetSubType(
            sub_type_numeric_code=sub_type['SubNumericCode'],
            sub_standard_name=sub_type['StandardName'],
            sub_type=sub_type['TargetSubType'],
            type_numeric_code=sub_type['TypeNumericCode'],
            type=sub_type['TargetType']
        )

    @staticmethod
    def __make_target(target):
        """
        is a private method that is only called by get_proposals
        <NB> this methods must not be called anywhere or be called by any method <NB>
        :param target: a row from the query results of target
        :return: Target class mapped target
        """
        identity = 'Target:' + str(target['Target_Id'])
        if identity in g.target_cache:
            return g.target_cache.get(identity)
        _target = Target(
                    id=identity,
                    proposal_code=target['Proposal_Code'],
                    name=target['Target_Name'],
                    requested_time=target['RequestedTime'],
                    optional=target['Optional'],
                    max_lunar_phase=target['MaxLunarPhase'],
                    sub_type=Target.__make_target_sub_type(target),
                    magnitude=Target.__make_target_magnitudes(target),
                    coordinates=Target.__make_target_coordinates(target))
        g.target_cache.setdefault(identity, _target)

        return _target

    @staticmethod
    def __get_target_sql(proposal_ids):
        """
        is a private method that is only called by get_proposals
        <NB> this methods must not be called anywhere or be called by any method<NB>
        :param proposal_ids:
        :return:
        """
        sql = 'SELECT Target_Id, Target_Name, RequestedTime, Optional, MaxLunarPhase, Proposal_Code, ' \
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
            .format(proposal_id=proposal_ids)

        return sql

    @staticmethod
    def get_targets(proposal_ids):
        """
        proposal_ids will reduce the number of targets to fetch to only proposals included in the proposal list Ids
        :param proposal_ids: the list of proposal in question
        :return: list of Targets
        """
        sql = Target.__get_target_sql(proposal_ids)

        results = pd.read_sql(sql, conn)
        res = [Target.__make_target(targ) for index, targ in results.iterrows()]
        return res

    @staticmethod
    def get_targets_of(**args):
        """
        having how you need the targets to be filtered this method can be called
        with one mandatory argument <args> semester <args> of type string like '"2017-2"'
        args can only be <args> partner_code or/and proposal_code and semester<args> other will not be filtered but
        ignored
        :param args: how data need to be filtered
        :return: a list targets filtered but args
        """
        from data.proposal import get_proposal_ids
        proposal_ids = get_proposal_ids(**args)

        return Target.get_targets(proposal_ids)
