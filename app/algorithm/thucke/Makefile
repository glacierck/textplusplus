dst_dir=.
src_dir=src
bin_dir=bin
head_dir=head

thucke=g++ -O3 -std=c++0x -march=native -I $(head_dir) -lpthread -v

all: $(bin_dir)/thucke 

$(bin_dir)/thucke: $(src_dir)/*.cpp $(head_dir)/*/*.h
	  $(thucke) $(src_dir)/thucke.cpp $(src_dir)/keywordExtract.cpp $(src_dir)/articleSpliter.cpp $(src_dir)/keywordLoad.cpp $(src_dir)/thulac_segment.cpp $(src_dir)/trie.cpp -o $(bin_dir)/thucke

clean:
	rm $(bin_dir)/thucke

pack:
	tar -zcvf THUCKE_lite_c++_v1.tar.gz Makefile bin configure lib res README.md conf head src
