import pandas as pd

from server.data.common import conn
from app import jwt


class User:
    pipt_user_id = None
    username = None
    pipt_setting_ids = None
    values = None
    chair = None
    partner_id = None

    def __init__(self, user_cred):
        settings = []
        vas = []
        sql = "SELECT PiptUser.PiptUser_Id as PiptUser_Id, Username, Password, PiptSetting_Id, Value, " \
              " Institute.Partner_Id as Partner_Id, Chair" \
              "     FROM PiptUser " \
              "         JOIN Investigator using(Investigator_Id) " \
              "         JOIN Institute using(Institute_Id) " \
              "         JOIN PiptUserSetting on (PiptUser.PiptUser_Id = PiptUserSetting.PiptUser_Id) " \
              "         LEFT JOIN PiptUserTAC on (PiptUser.PiptUser_Id = PiptUserTAC.PiptUser_Id) " \
              "     WHERE PiptUser.Username = '{username}' AND PiptUser.Password = md5('{password}') "\
            .format(username=user_cred["username"], password=user_cred["password"])

        user = pd.read_sql(sql, conn)
        print(user)
        if len(user['Username'].values[0]) > 0:
            if user_cred["password"] == user['Password'].values[0]:
                for i, u in user.iterrows():
                    settings.append(int(u['PiptSetting_Id']))
                    vas.append(int(u['Value']))
                self.pipt_user_id = int(user["PiptUser_Id"].values[0])
                self.username = user['Username'].values[0]
                self.pipt_setting_ids = settings
                self.values = vas
                self.chair = int(user['Chair'].values[0]) if user['Chair'].values[0] is not None else 0
                self.partner_id = int(user['Partner_Id'].values[0])
        print(self.username)

    def get_token(self, **args):
        """
        
        :param args: 
        :return: 
        """
        token_username = {"error": "user not valid"}
        """
        it creates a token for  the user using users username and password
        :param args: the users credentials(username and password)
        :return: user token
        """
        sql = "SELECT Username, Password, FROM PiptUser WHERE Username = '{username}' AND Password = md5('{password}')"\
            .format(username=args["username"], password=args["password"])
        user = pd.read_sql(sql, conn)
        if len(user['Username'].values) > 0:
            token_username = {'username': user['Username'].values[0]}
        token = jwt.dumps(token_username)
        return token
