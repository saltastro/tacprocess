from flask import Flask, g, jsonify, request, make_response, Response
from flask_cors import CORS
from flask_graphql import GraphQLView
from schema import schema
import os
from flask_httpauth import HTTPTokenAuth
from itsdangerous import TimedJSONWebSignatureSerializer as JWT

from functools import wraps
from werkzeug.security import generate_password_hash


from flask_jwt import jwt_required

auth = HTTPTokenAuth(scheme='Token')

is_developoment = 'FLASK_DEBUG' in os.environ and os.environ['FLASK_DEBUG'] == '1'

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'top secret!'
app.debug = True

jwt = JWT(app.config['SECRET_KEY'], expires_in=3600)


#
# @app.route("/login")
# def login():
#     from main import User
#     is_user = None
#     if request.authorization:
#         is_user = User.user_login({'username': request.authorization.username, 'password': request.authorization.password})
#         if is_user == None:
#             return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})
#         return is_user
#     print(is_user)
#     return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})
#
#
# @auth.verify_token
# def verify_token(req):
#     #from main import User
#     g.user = None
#     hed = request.headers
#     print(hed)
#     if 'Authtoken' in request.headers:
#         token = request.headers['Authtoken']
#
#     g.target_cache = {}  # Todo create a decorator to do this
#
#     try:
#         data = jwt.loads(token)
#     except:
#         return False
#     if 'username' in data:
#         #g.user = User(data['username'])
#         return True
#     return True
#

def check_auth(username, password):
    from main import User
    """This function is called to check if a username /
    password combination is valid.
    """
    return User.user_login({'username': username, 'password': password})


def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response('Could not verify your access level for that URL.\nYou have to login with proper credentials', 401,
                    {'WWW-Authenticate': 'Basic realm="Login Required"'})


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated


def graphql():
    view = GraphQLView.as_view('graphql', schema=schema, graphiql=True if is_developoment else False)
    return view

app.add_url_rule('/graphql', view_func=requires_auth(graphql()))


@app.errorhandler(404)
def not_found(e):
    return jsonify({"message": "there is no such route(endpoint)"})

if __name__ == '__main__':
    app.run(port=5001)
