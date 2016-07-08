from flask import Flask
from algorithm import thulac
import MySQLdb

app = Flask(__name__)
app.config['SECRET_KEY'] = 'youguessguess'

from app import view,api,console,semantic,user
