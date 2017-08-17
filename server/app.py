from flask import Flask, g, jsonify, request
from flask_cors import CORS
from flask_graphql import GraphQLView
from schema import schema
import os

from itsdangerous import TimedJSONWebSignatureSerializer as JWT
from flask_httpauth import HTTPTokenAuth

is_developoment = 'FLASK_DEBUG' in os.environ and os.environ['FLASK_DEBUG'] == '1'

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'top secret!'
app.debug = True

jwt = JWT(app.config['SECRET_KEY'], expires_in=3600)
auth = HTTPTokenAuth(scheme='Token')




@app.route("/token", methods=['POST'])
def token():
    from main import User
    user_credentials = request.json
    user_id = User.find_user_id(username=user_credentials.get('username', ''),
                                password=user_credentials.get('password', ''))
    if user_id is None:
        raise ValueError('Invalid username or password.')
    return jsonify({
        'token': User.create_token(user_id).decode('utf-8')
    })


@auth.verify_token
def verify_token(token):
    from main import User
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
