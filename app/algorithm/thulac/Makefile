dst_dir=.
src_dir=src
bin_dir=.
thulac=g++ -O3 -std=c++0x -march=native -I $(src_dir)

#all: $(dst_dir)/dat_builder $(dst_dir)/thulac $(dst_dir)/thulac_time $(dst_dir)/predict_c
all: $(bin_dir)/thulac

$(bin_dir)/thulac: $(src_dir)/thulac.cc $(src_dir)/*.h
	$(thulac) $(src_dir)/thulac.cc -o thulac
