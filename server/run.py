from flask import Flask, jsonify, request, g, make_response
from flask_graphql import GraphQLView
from flask_httpauth import HTTPTokenAuth
from schema.query import schema
from schema.user import User


app = Flask(__name__)
app.debug = True

auth = HTTPTokenAuth(scheme='Token')


@auth.verify_token
def verify_token(token):
    g.user_id = None
    try:
        is_valid = User.is_valid_token(token)
        return is_valid
    except:
        return False


@app.route("/token", methods=['POST'])
def token():
    if request.json:
        return User.get_user_token(request.json)
    return jsonify({"errors": {"global": "Invalid user"}}), 401

app.add_url_rule('/graphql', view_func=auth.login_required(
    GraphQLView.as_view('graphql', schema=schema, graphiql=True)))


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(port=5001)
