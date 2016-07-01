from flask import Flask,json,request,abort,url_for
import time,random,string
from app import app, thulac
from model import engine, Tokeninfo, User, DBSession

def check_token(token):

	s = DBSession()
	u = s.query(User).filter(User.token==token).first()
	if u is None:
		return False
	return True

@app.route('/api/thulac', methods=['GET','POST'])
def semlac():
	print request.form
	if not request.form:
		return json.dumps({ 'code': 201,'message': 'format error' }), 400
	
	result = []	
	raws = request.form
	token = raws['token']
	
	print raws
	if(check_token(token) == False):
		return json.dumps({'code': 205,'message': 'the token is invalid'}), 203

	raw = raws['text']

	raw1 = thulac.run(raw.encode('utf-8'))
	raw2 = raw1.strip().split(" ")

	ans = map(lambda x:{"word":x.split("_")[0], "type":x.split("_")[1]}, raw2)

	return json.dumps({'code': 100,'message': 'success','result': ans})

@app.route('/api/userinfo', methods=['GET','POST'])
def getuserinfo():
	pass