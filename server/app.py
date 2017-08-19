from flask import Flask, g, jsonify, request
from flask_cors import CORS
from flask_graphql import GraphQLView
import graphene
from graphene import resolve_only_args
import os

from schema.instruments import Hrs, Rss, Salticam, Bvit
from schema.user import User

from itsdangerous import TimedJSONWebSignatureSerializer as JWT
from flask_httpauth import HTTPTokenAuth

is_development = 'FLASK_DEBUG' in os.environ and os.environ['FLASK_DEBUG'] == '1'

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'top secret!'
app.debug = True

jwt = JWT(app.config['SECRET_KEY'], expires_in=3600)
auth = HTTPTokenAuth(scheme='Token')


class Query(graphene.ObjectType):
    """
    root and the only query that that can be made
    returning only the results queried for in the structure described by user
    """

    viewer = graphene.Field(User)

    @resolve_only_args
    def resolve_viewer(self):
        return User.from_id(g.user_id)

schema = graphene.Schema(query=Query, types=[Rss, Hrs, Salticam, Bvit])


@app.route("/token", methods=['POST'])
def token():
    user_credentials = request.json
    user_id = User.find_user_id(username=user_credentials.get('username', ''),
                                password=user_credentials.get('password', ''))
    if user_id is None:
        raise ValueError('Invalid username or password.')
    return jsonify({
        'token': create_token(user_id).decode('utf-8')
    })


@auth.verify_token
def verify_token(token):
    g.user_id = None
    try:
        data = jwt.loads(token)
    except:
        return False
    if 'user_id' in data:
        g.user_id = data['user_id']
        return True
    return False


def create_token(user_id):
    """
    Create a token containing the given user id.

    :param user_id:
    :return: the token
    """

    return jwt.dumps({'user_id': 'User:{user_id}'.format(user_id=user_id)})


app.add_url_rule('/graphql', view_func=auth.login_required(GraphQLView.as_view(
     'graphql', schema=schema, graphiql=True if is_development else False))) # for having the GraphiQL interface


if __name__ == '__main__':
    app.run(port=5001)
