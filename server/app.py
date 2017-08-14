from flask import Flask, g, jsonify, request
from flask_cors import CORS
from flask_graphql import GraphQLView
from server.schema import schema
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




@app.route("/login", methods=['POST'])
def login():
    from server.main import User
    user = User(request.json)
    return jsonify({
        'token': user.get_token().decode('utf-8'),
        'username': user.username,
        'firstName': user.first_name,
        'surname': user.surname,
        'partnerCode': user.partner_code
    })


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
