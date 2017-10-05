from flask import g
import pandas as pd
from data.common import conn
from flask import jsonify
import jwt


class User:
    @staticmethod
    def get_user_token(credentials):
        if credentials is None:
            return User._user_error(not_provided=True), 401
        try:
            username = credentials['username']
            password = credentials['password']
        except KeyError:
            return User._user_error(not_provided=True), 401

        user_id = User.query_id(username, password)

        if user_id is None:
            return User._user_error(not_found=True), 401
        return User.create_token(user_id), 200

    @staticmethod
    def _user_error(not_provided=False, not_found=False):
        if not_provided:
            return jsonify({'errors': {'global': 'username or password not provide'}})

        if not_found:
            return jsonify({'errors': {'global': 'user not found'}})

    @staticmethod
    def query_id(username, password):
        """
        :param username: username
        :param password: password
        :return: PiptUser_Id or no if not found
        """
        sql = "SELECT PiptUser_Id From PiptUser where Username='{username}' AND Password=MD5('{password}')"\
            .format(username=username, password=password)
        result = pd.read_sql(sql, conn)

        try:
            return result.iloc[0]['PiptUser_Id']
        except IndexError:
            return None

    @staticmethod
    def create_token(user_id):
        """
        Create a token containing the given user id.

        :param user_id:
        :return: the token
        """
        user = {'user_id': 'User:{user_id}'.format(user_id=user_id)}
        print("USER ID: ", user)
        token = jwt.encode(user, "SECRET-KEY", algorithm='HS256').decode('utf-8')

        return jsonify({"user": {"token": token}})
