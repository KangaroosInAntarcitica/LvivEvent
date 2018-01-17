from flask import Flask, render_template, request, url_for, redirect, \
    json, jsonify
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from werkzeug.security import generate_password_hash, \
    check_password_hash
import os
from string import ascii_letters, digits
import re

from datetime import date


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
    print("A post request to register was made")
    print("The details are: ", request.json)

    username = request.json["username"]
    # validate username
    if (not 0 < len(username) < 11) or \
            (not set(ascii_letters + digits + '_').issuperset(set(username.lower()))):
        return jsonify(status="wrong username format")
    if Users.query.filter_by(username=username).first():
        return jsonify(status="username unavailable")

    email = request.json["email"]
    # validate email
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify(status="wrong e-mail format")
    if Users.query.filter_by(email=email).first():
        return jsonify(status="e-mail unavailable")

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
    print("The details are: ", request.json)

    username = request.json["username"]
    password = request.json["password"]

    user = Users.query.filter_by(username=username).first()
    if (user and check_password_hash(user.pw_hash, password)):
        return jsonify(status="success")
    else:
        return jsonify(status="wrong e-mail or password")

# EVENTS PART
# TODO make a separate file for different functions

class Events(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)
    startdate = db.Column(db.Date)
    enddate = db.Column(db.Date)
    image = db.Column(db.Text)
    description = db.Column(db.Text)
    address = db.Column(db.Text)
    transfer = db.Column(db.Text)
    timetable = db.Column(db.Text)

    def __init__(self, data):
        self.name = data['name']

        self.startdate = date(*map(int, data['startdate'].split('-')))
        self.enddate = date(*map(int, data['enddate'].split('-')))

        self.image = data['image'] if 'image' in data else None
        self.description = data['description'] if 'description' in data else None
        self.address = data['address'] if 'address' in data else None
        self.transfer = data['transfer'] if 'transfer' in data else None
        self.timetable = data['timetable'] if 'timetable' in data else None

@app.route("/events", methods=["GET"])
def get_events():
    print("A get request to events was made")

    def parse_event(event):
        return {
            'name': event.name,
            'enddate': str(event.enddate),
            'startdate': str(event.startdate),
            'image': event.image,
            'address': event.address,
            'transfer': event.transfer,
            'timetable': event.timetable
        }

    events = list(map(parse_event, Events.query.all()))
    return jsonify(events)

@app.route("/newEvent", methods=["POST"])
def post_event():
    print("A post request to newEvent was made")

    data = request.json

    new_event = Events(data)
    db.session.add(new_event)
    db.session.commit()
    return jsonify(status="success")


if __name__ == '__main__':
    app.run(debug=True)
