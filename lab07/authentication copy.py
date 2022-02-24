from flask import (
    request, make_response, render_template, redirect
)
from models import User
import flask_jwt_extended

def logout():
    # hint:  https://dev.to/totally_chase/python-using-jwt-in-cookies-with-a-flask-app-and-restful-api-2p75
    return 'Implement Logout functionality'

def login():
    if request.method == 'POST':
        print(request.form)
        username1 = request.form.get('username')
        password1 = request.form.get('password')
        if not username1:
            return render_template(
            'login.html',
            message = 'Missing username')
        if not password1:
            return render_template(
            'login.html',
            message = 'Missing password')
        user = User.query.filter_by(username=username1).one_or_none()
        print(user)
        if user:
            # check password
            if user.check_password(password1):
                print('User is authenticated')
                access_token = flask_jwt_extended.create_access_token(identity=user.id)
                response = make_response(redirect('/'))
                flask_jwt_extended.set_access_cookies(response, access_token)
                return response
            else:
                return render_template(
                    'login.html',
                    message = 'Bad password')
        # authenticate user here. If the user sent valid credentials, set the
        # JWT cookies:
        # https://flask-jwt-extended.readthedocs.io/en/3.0.0_release/tokens_in_cookies/
        else:
            return render_template(
                'login.html', 
                message='Invalid username (not in database)'
            )
    else:
        return render_template(
            'login.html'
        )

def initialize_routes(app):
    app.add_url_rule('/login', 
        view_func=login, methods=['GET', 'POST'])
    app.add_url_rule('/logout', view_func=logout)