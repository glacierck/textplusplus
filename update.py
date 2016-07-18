import MySQLdb
import time
conn=MySQLdb.connect(host='127.0.0.1',user='root',passwd='thunlp',port=3306)
conn.select_db('thunlp')
cursor=conn.cursor()
dt = 'd'+time.strftime('%Y%m%d',time.localtime(time.time()))
cursor.execute('alter table lac add column ' + dt + ' integer;')
conn.commit()
conn.close()