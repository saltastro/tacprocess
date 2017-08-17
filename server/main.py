import pandas as pd

from data.common import conn
from app import jwt


class User:
    pipt_user_id = None
    username = None
    pipt_setting_ids = None
    values = None
    chair = None
    partner_id = None

    def __init__(self, user_id):
        settings = []
        vas = []
        sql = "SELECT PiptUser.PiptUser_Id as PiptUser_Id, Username, Password, FirstName, Surname, PiptSetting_Id, Value, " \
              " Partner_Code, Chair" \
              "     FROM PiptUser " \
              "         JOIN Investigator using(Investigator_Id) " \
              "         JOIN PiptUserSetting on (PiptUser.PiptUser_Id = PiptUserSetting.PiptUser_Id) " \
              "         LEFT JOIN PiptUserTAC on (PiptUser.PiptUser_Id = PiptUserTAC.PiptUser_Id) " \
              "         LEFT JOIN Partner ON (PiptUserTAC.Partner_Id=Partner.Partner_Id)" \
              "     WHERE PiptUser.PiptUser_Id = '{user_id}' "\
            .format(user_id=user_id)

        user = pd.read_sql(sql, conn)
        # TODO: Handle permissions
        # for i, u in user.iterrows():
        #     settings.append(int(u['PiptSetting_Id']))
        #     vas.append(int(u['Value']))
        self.pipt_user_id = int(user["PiptUser_Id"].values[0])
        self.username = user['Username'].values[0]
        self.first_name = user['FirstName'].values[0]
        self.surname = user['Surname'].values[0]
        self.partner_code = user['Partner_Code'].values[0]
        # self.pipt_setting_ids = settings
        # self.values = vas
        self.chair = bool(int(user['Chair'].values[0])) if user['Chair'].values[0] is not None else False

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

    @staticmethod
    def create_token(user_id):
        """
        Create a token containing the given user id.

        :param user_id:
        :return: the token
        """

        token = jwt.dumps({'user_id': str(user_id)})
        return token

    @staticmethod
    def from_token(token):
        """
        Create a User instance from a token.

        :param token: token
        :return: the User instance
        """

        data = jwt.loads(token)
        user_id = data['user_id']

        return User(user_id)
