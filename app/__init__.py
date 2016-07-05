from flask import Flask
from algorithm import thulac
import MySQLdb

app = Flask(__name__)
app.config['SECRET_KEY'] = 'youguessguess'
conn=MySQLdb.connect(host='127.0.0.1',user='root',passwd='thunlp',port=3306)
conn.select_db('thunlp')

from app import user,view,api,console,semantic
