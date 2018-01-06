from flask import Flask, render_template, request, url_for, redirect, \
    json, jsonify
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from werkzeug.security import generate_password_hash, \
    check_password_hash
import os

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True)
    email = db.Column(db.Text, unique=True)
    pw_hash = db.Column(db.Text)
    uuid = db.Column(db.Text, unique=True)

    def __init__(self, username, email, pw_hash):
        self.username = username
        self.email = email
        self.pw_hash = pw_hash
        self.uuid = str(uuid4())

@app.route('/', methods=['GET'])
def default():
    return('This is the default webpage. Here is your request: ' + str(request))

@app.route("/register", methods=["POST"])
def register():
    username = request.json["username"]
    email = request.json["email"]
    pw_hash = generate_password_hash(request.json["password"])
    if username and email and pw_hash:
        new_user = Users(username, email, pw_hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(status="success")
    else:
        return jsonify(status="failure")


@app.route("/login", methods=["POST"])
def login():

    print("A post request to login was made")
    username = request.json["username"]
    password = request.json["password"]
    print("Username:", username, "\t - Password:", password)
    
    user = Users.query.filter_by(username=username).first()
    if user:
        if check_password_hash(user.pw_hash, password):
            return jsonify(status="success")
        else:
            return jsonify(status="wrong password")
    else:
        return jsonify(status="wrong username")


if __name__ == '__main__':
    app.run(debug=True)
