
from flask import Flask, jsonify, request
from flask_graphql import GraphQLView
from schema.query import schema
from schema.user import User


app = Flask(__name__)
app.debug = True




@app.route("/token", methods=['POST'])
def token():
    if request.json:
        return User.get_user_token(request.json)
    return jsonify({"errors": {"global": "Invalid user"}}), 401

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

if __name__ == '__main__':
    app.run(port=5001)