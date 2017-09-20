
from flask import Flask, jsonify, request
from flask_graphql import GraphQLView
from schema.query import schema
from schema.user import User

app = Flask(__name__)
app.debug = True


@app.route("/token", methods=['POST'])
def token():
    user_credentials = request.json
    user_id = User.find_user_id(username=user_credentials.get('username', ''),
                                password=user_credentials.get('password', ''))
    if user_id is None:
        return 'Invalid username or password.', 401
    return jsonify({
       #  'token': create_token(user_id).decode('utf-8')
    })

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

if __name__ == '__main__':
    app.run()