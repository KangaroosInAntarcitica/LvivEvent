from flask import Flask, render_template, request, url_for, redirect, \
    json, jsonify
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from werkzeug.security import generate_password_hash, \
    check_password_hash
import os
from string import ascii_letters, digits
import re


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
    # validate username
    if (not 0 < len(username) < 11) or \
            (not set(ascii_letters + digits + '_').issuperset(set(username.lower()))):
        return jsonify(status="invalid username format")
    if Users.query.filter_by(username=username).first():
        return jsonify(status="username is already taken")

    email = request.json["email"]
    # validate email
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify(status="invalid e-mail format")
    if Users.query.filter_by(email=email).first():
        return jsonify(status="e-mail is already taken")

    password = request.json["password"]
    # validate password
    if (not 8 <= len(password)):
        return jsonify(status="too short password")
    pw_hash = generate_password_hash(password)

    new_user = Users(username, email, pw_hash)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(status="success")


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
            return jsonify(status="wrong username or password")
    else:
        return jsonify(status="wrong username or password")


if __name__ == '__main__':
    app.run(debug=True)
