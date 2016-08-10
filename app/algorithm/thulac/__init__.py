from ctypes import cdll,c_char_p,string_at
#lib = cdll.LoadLibrary('app/algorithm/thulac/thulac.dll')

class Thulac(object):
	def __init__(self):
		#self.obj = lib.Thulac_new()
		#lib.Thulac_run.restype = c_char_p
		pass
	def run(self,raw):
		ret = lib.Thulac_run(self.obj,raw)
		return ret

thulac = Thulac()
