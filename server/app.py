from flask import Flask, g, jsonify, request, make_response
from flask_cors import CORS
from flask_graphql import GraphQLView
from schema import schema
import os
#from main import User

from itsdangerous import TimedJSONWebSignatureSerializer as JWT
from flask_httpauth import HTTPTokenAuth

is_developoment = 'FLASK_DEBUG' in os.environ and os.environ['FLASK_DEBUG'] == '1'

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'top secret!'
app.debug = True

jwt = JWT(app.config['SECRET_KEY'], expires_in=3600)
auth = HTTPTokenAuth(scheme='Token')


@app.route("/login")#, methods=['POST', 'GET'])
def login():
    # request.authorization.username
    # request.authorization.password
    is_user = None
    if request.authorization:
        #is_user = User.user_login({'username': request.authorization.username, 'password': request.authorization.password})
        return ""
    print(is_user)
    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})
    # user = User(request.json)
    #
    # return jsonify({
    #     'token': user.get_token().decode('utf-8'),
    #     'username': user.username,
    #     'firstName': user.first_name,
    #     'surname': user.surname,
    #     'partnerCode': user.partner_code
    # })


@auth.verify_token
def verify_token(token):
    from main import User
    g.user = None

    g.target_cache = {} # Todo create a decorator to do this

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
