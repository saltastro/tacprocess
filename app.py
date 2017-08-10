from functools import wraps

from flask import Flask, g, request
from flask_graphql import GraphQLView
from server.schema import schema
import os

from itsdangerous import TimedJSONWebSignatureSerializer as JWT
from flask_httpauth import HTTPTokenAuth

is_developoment = 'FLASK_DEBUG' in os.environ and os.environ['FLASK_DEBUG'] == '1'

app = Flask(__name__)
app.config['SECRET_KEY'] = 'top secret!'
app.debug = True

jwt = JWT(app.config['SECRET_KEY'], expires_in=3600)
auth = HTTPTokenAuth(scheme='Token')




@app.route("/login", methods=['POST'])
def get_token():
    from server.main import User
    us = {"username": 'nhlavutelo',
          "password": os.environ["PASSWORD"]}
    user = User(user_cred=us)  # Todo send a json(username and password) from the web not this
    print(user.get_token())
    return user.get_token()
    

@auth.verify_token
def verify_token(token):
    from server.main import User
    g.user = None
    try:
        data = jwt.loads(token)
    except:
        return True
    if 'username' in data:
        g.user = User(data['username'])
        return True
    return True

app.add_url_rule('/graphql', view_func=auth.login_required(GraphQLView.as_view(
     'graphql', schema=schema, graphiql=True if is_developoment else False))) # for having the GraphiQL interface


if __name__ == '__main__':
    app.run(port=5001)
