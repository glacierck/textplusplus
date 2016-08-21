from flask import Flask
import MySQLdb

app = Flask(__name__)
app.config['SECRET_KEY'] = 'youguessguess'

from app import view,api,console,semantic,user
