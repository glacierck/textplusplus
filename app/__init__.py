from flask import Flask
from algorithm import thulac
from model import DBSession

app = Flask(__name__)
app.config['SECRET_KEY'] = 'youguessguess'

from app import user,api
