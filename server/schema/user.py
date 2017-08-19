from flask import g
import graphene
from graphene import relay as r, resolve_only_args
import pandas as pd
from data.common import conn
from data.proposal import get_proposals_of
from schema.partner import Partner
from schema.proposal import Proposal
from schema.target import Target


class User(graphene.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    first_name = graphene.Field(graphene.String)
    surname = graphene.Field(graphene.String)
    username = graphene.Field(graphene.String)
    partner = graphene.Field(Partner)
    is_chair = graphene.Field(graphene.Boolean)
    p1_proposals = graphene.Field(graphene.List(Proposal), partner_code=graphene.String(), semester=graphene.String(),
                                  investigator_email=graphene.String(), proposal_code=graphene.String())
    targets = graphene.Field(graphene.List(Target), target_name=graphene.String(), proposal_code=graphene.String(),
                             semester=graphene.String())

    def __init__(self, pipt_user_id, **args):
        super().__init__(**args)

        self.pipt_user_id = pipt_user_id
        self.first_name = args['first_name']
        self.surname = args['surname']
        self.username = args['username']
        self.partner = args['partner']
        self.is_chair = args['is_chair']

    @resolve_only_args
    def resolve_id(self):
        return 'User:{pipt_user_id}'.format(pipt_user_id=self.pipt_user_id)

    @graphene.resolve_only_args
    def resolve_partners(self, **args):
        return Partner.get_partner(**args)

    @graphene.resolve_only_args
    def resolve_p1_proposals(self, semester, **args):
        g.target_cache = {}
        return get_proposals_of(semester=semester, **args)

    @graphene.resolve_only_args
    def resolve_targets(self, semester, **args):
        """
        this method will return list of all targets in sdb and is any args are provided will return targets
        that meet **args request
        :param args: Targets filtering arguments
        :param semester:
        :return: list of targets
        """
        g.target_cache = {}
        return Target.get_targets_of(semester=semester, **args)

    @staticmethod
    def pipt_user_id_from_id(user_id):
        return user_id.split(':')[1]

    @staticmethod
    def from_id(user_id):
        if user_id is None:
            return None

        sql = "SELECT PiptUser.PiptUser_Id as PiptUser_Id, Username, Password, FirstName, Surname, PiptSetting_Id, Value, " \
              " Partner_Code, Chair" \
              "     FROM PiptUser " \
              "         JOIN Investigator using(Investigator_Id) " \
              "         JOIN PiptUserSetting on (PiptUser.PiptUser_Id = PiptUserSetting.PiptUser_Id) " \
              "         LEFT JOIN PiptUserTAC on (PiptUser.PiptUser_Id = PiptUserTAC.PiptUser_Id) " \
              "         LEFT JOIN Partner ON (PiptUserTAC.Partner_Id=Partner.Partner_Id)" \
              "     WHERE PiptUser.PiptUser_Id = '{pipt_user_id}' " \
            .format(pipt_user_id=User.pipt_user_id_from_id(user_id))

        user = pd.read_sql(sql, conn)
        # TODO: Handle permissions
        # for i, u in user.iterrows():
        #     settings.append(int(u['PiptSetting_Id']))
        #     vas.append(int(u['Value']))

        return User(pipt_user_id=user["PiptUser_Id"].values[0],
                    first_name=user['FirstName'].values[0],
                    surname=user['Surname'].values[0],
                    username=user['Username'].values[0],
                    partner=Partner.get_partner(partner_code=user['Partner_Code'].values[0]),
                    is_chair=bool(int(user['Chair'].values[0])) if user['Chair'].values[0] is not None else False)

    @staticmethod
    def from_credentials(username, password):
        return User.from_id(User.find_user_id(username=username, password=password))

    @staticmethod
    def find_user_id(username, password):
        """
        Find the user id (i.e. the value of the PiptUser_Id column in the PiptUser table) for the user with the given
        username anb password. None is returned if there exists no user with the given credentials.

        :param username: username
        :param password: password
        :return: the user id
        """

        sql = "SELECT PiptUser_Id FROM PiptUser WHERE Username='{username}' AND Password=MD5('{password}')" \
            .format(username=username, password=password)

        user = pd.read_sql(sql, conn)
        if len(user['PiptUser_Id']) > 0:
            return user['PiptUser_Id'].values[0]
        else:
            return None

