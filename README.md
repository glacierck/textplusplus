# textplusplus

##API接口使用方法

####1.分词和词性标注

各个标签对应词性见[词性标注说明](#词性标注说明)。

**URL**

`http://114.55.88.218:5000/api/lac`

**HTTP Method**

`POST`

**HTTP Header**

`Content-Type`:`application/json`
	
`Accept`:`application/json`

`Token`:`YOUR_API_TOKEN （需要替换成您自己的 Token）`

`HTTP 请求 Body`

JSON 格式的需要做分词与词性标注的utf-8编码的文本。比如：

`{'content':"\u8fd9\u4e2a\u4e16\u754c\u597d\u590d\u6742"}`

**HTTP 返回 Body**

JSON 格式的分词与词性标注结果。比如：

```
{
	'code': 100, 
	'message': u'success',   
	'result': [
		[u'\\u8fd9\\u4e2a\\u4e16\\u754c\\u597d\\u590d\\u6742', u'nz']
	]
}
```

返回参数说明：

|参数名|类型|说明|
|-|-|-|
|code|int|状态码|
|message|string|状态码说明|
|result|array|分词和词性标注结果|

##CURL调用事例

####分词和词性标注

调用：

```
curl -X POST \
     -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     -H "Token: YOUR_API_TOKEN" \
     --data "{\"content\":\"人民法院案件受理制度改革  下月起法院将有案必立\"}" \
     'http://114.55.88.218:5000/api/lac'
```
返回结果：

```
{
	"code": 100, 
	"message": "success", 
	"result": [
		["\u4eba\u6c11\u6cd5\u9662", "n"], 
		["\u6848\u4ef6", "n"], 
		["\u53d7\u7406", "v"], 
		["\u5236\u5ea6", "n"], 
		["\u6539\u9769", "v"], 
		["\u4e0b\u6708", "t"], 
		["\u8d77", "v"], 
		["\u6cd5\u9662", "n"], 
		["\u5c06", "d"], 
		["\u6709", "v"], 
		["\u6848", "g"],
		["\u5fc5", "d"], 
		["\u7acb", "v"]
	]
}
```

##Python 调用示例

####分词和词性标注

程序：

```
# -*- encoding: utf-8 -*-
import json
import requests


LAC_URL = 'http://114.55.88.218:5000/api/lac'
s = {"content" : '我爱北京天安门'.decode("utf-8")}
data = json.dumps(s)
headers = {'Token': 'YOUR_API_TOKEN', 'Content-type': 'application/json'}
resp = requests.post(LAC_URL, headers=headers, data=data)

result = resp.json()

print result['code'], result['message']

print " ".join(["%s/%s" % (i[0],i[1]) for i in result['result']])
```

输出结果：

```
100 success
我/r 爱/v 北京/ns 天安门/ns
```

##附录

####词性标注说明

```
n/名词 np/人名 ns/地名 ni/机构名 nz/其它专名
m/数词 q/量词 mq/数量词 t/时间词 f/方位词 s/处所词
v/动词 vm/能愿动词 vd/趋向动词 a/形容词 d/副词
h/前接成分 k/后接成分 i/习语 j/简称
r/代词 c/连词 p/介词 u/助词 y/语气助词
e/叹词 o/拟声词 g/语素 w/标点 x/其它 
```