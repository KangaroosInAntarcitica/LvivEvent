from flask import Flask, render_template, request, url_for, redirect, json, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root@localhost/test"
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)


class Users(db.Model):
    tablename = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True)
    email = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)

    def init(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("register.html")
    elif request.method == "POST":
        _username = request.json["username"]
        _email = request.json["email"]
        _password = request.json["password"]
        if _username and _email and _password:
            new_user = Users(_username, _email, _password)
            db.session.add(new_user)
            db.session.commit()
        return render_template("success.html")


@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    user = Users.query.filter_by(username=username).first()
    if user:
        if user.password == password:
            return jsonify(status="success")
        else:
            return jsonify(status="wrong password")
    else:
        return jsonify(status="wrong username")


if __name__ == '__main__':
    app.run(debug=True)