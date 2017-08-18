import pandas as pd
import os
from flask import g
from werkzeug.security import check_password_hash

from data.common import conn


class User:
    pipt_user_id = None
    username = None
    pipt_setting_ids = None
    values = None
    chair = None
    roles = None
    partner_id = None

    def __init__(self, user):
        self.pipt_user_id = int(user["PiptUser_Id"].values[0])
        self.username = user['Username'].values[0]
        self.first_name = user['FirstName'].values[0]
        self.surname = user['Surname'].values[0]
        self.partner_code = user['Partner_Code'].values[0]
        self.roles = 'ALL' if int(user['Value'].values[0]) == 3 else 'OWN' \
            if int(user['Value'].values[0]) == 1 \
            else None

        self.chair = bool(int(user['Chair'].values[0])) if user['Chair'].values[0] is not None else False

    @staticmethod
    def user_login(credentials):

        sql = "SELECT PiptUser.PiptUser_Id as PiptUser_Id, Username, FirstName, Surname, PiptSetting_Id, " \
              " Value, Partner_Code, Chair" \
              "     FROM PiptUser " \
              "         JOIN Investigator using(Investigator_Id) " \
              "         JOIN PiptUserSetting on (PiptUser.PiptUser_Id = PiptUserSetting.PiptUser_Id) " \
              "         LEFT JOIN PiptUserTAC on (PiptUser.PiptUser_Id = PiptUserTAC.PiptUser_Id) " \
              "         LEFT JOIN Partner ON (PiptUserTAC.Partner_Id=Partner.Partner_Id)" \
              "     WHERE PiptUser.Username = '{username}' AND Password = md5('{password}') AND PiptSetting_Id = 20 " \
            .format(username=credentials['username'], password=credentials['password'])
        results = pd.read_sql(sql, conn)

        if results.empty:
            return False
        g.user = User(results)
        return True


if __name__ == "__main__":
    user = User.user_login({'username':'nhlavutelo', 'password': os.environ['PASSWORD']})