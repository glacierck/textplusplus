#coding=utf-8

from flask import Flask,json,request,abort,url_for
import time,random,string
from app import app, thulac, conn

def check_token(token):

	s = DBSession()
	u = s.query(User).filter(User.token==token).first()
	if u is None:
		return False
	return True

def updata_time(token,name,api):

	s = DBSession()
	u = s.query(User).filter(User.token==token).first()
	uid = u.id
	
	utoken = s.query(api).filter(api.user==uid).first()
	t = utoken.times + 1

	s.query(Tokeninfo).filter(Tokeninfo.user==uid,Tokeninfo.api==name).update({'times' : t, 'last_time' : time.time()})
	s.commit()
	s.close()

def check_tokentime(token,name,api):

	max_count = 1000
	min_frequen = 5

	s = DBSession()

	u = s.query(User).filter(User.token==token).first()
	uid = u.id
	utoken = s.query(api).filter(api.user==uid).first()
	print utoken['20160630']

	if utoken == None:
		info = Tokeninfo()
		
		info.id = uid+name
		info.user = uid
		info.api = name
		info.times = 0
		info.last_time = time.time()
		info.limit_times = max_count
		info.frequen = min_frequen
		s.add(info)
		s.commit()
		s.close()
		return 0

	t = utoken.times
	limitt = utoken.limit_times
	if t >= limitt:
		return 1

	nowt = time.time()
	lastt = float(utoken.last_time)
	fre = utoken.frequen
	if(nowt - lastt < fre):
		return 2

	return 0

@app.route('/api/lac', methods=['GET','POST'])
def lac():
	if not request.json:
		return json.dumps({ 'code': 201,'message': 'format error' }), 400
	
	result = []	
	raws = request.json
	token = request.headers.get_all('Token')[0].encode('utf-8')
	

	if(check_token(token) == False):
		return json.dumps({'code': 205,'message': 'the token is invalid'}), 203
	
	tokenuse = check_tokentime(token, "lac", Lac)	
	if(tokenuse == 1):
		return json.dumps({'code': 206,'message': 'count limit exceed'}), 203
	if(tokenuse == 2):
		return json.dumps({ 'code': 207,'message': 'frequency limit exceed' }), 203

	global thu1
	for i in raws:

		a = thulac.run(i.encode('utf-8'))
		b = a.split(" ")
		ans = []
		for j in b:
			c = j.split('_')
			ans.append((c[0], c[1]))
		result.append(ans)
		
	updata_time(token, "lac", Lac)

	return json.dumps({'code': 100,'message': 'success','result': result})