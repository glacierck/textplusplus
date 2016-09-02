all:cobj cxxobj thuctc.exe clean

cobj:: liblinear-2.1/blas/daxpy.c liblinear-2.1/blas/ddot.c liblinear-2.1/blas/dnrm2.c liblinear-2.1/blas/dscal.c
	gcc -c liblinear-2.1/blas/daxpy.c liblinear-2.1/blas/ddot.c liblinear-2.1/blas/dnrm2.c liblinear-2.1/blas/dscal.c
cxxobj:: BasicTextClassifier.cpp  LiblinearTextClassifier.cpp  Lexicon.cpp  DocumentVector.cpp  BigramWordSegment.cpp  LangUtils.cpp  liblinear-2.1/linear.cpp  liblinear-2.1/tron.cpp 
	g++ -std=c++11 -c ThuctcClassify.cpp BasicTextClassifier.cpp  LiblinearTextClassifier.cpp  Lexicon.cpp  DocumentVector.cpp  BigramWordSegment.cpp  LangUtils.cpp  liblinear-2.1/linear.cpp  liblinear-2.1/tron.cpp 
thuctc.exe::
	g++ -std=c++11 -o thuctc main.cpp BasicTextClassifier.o BigramWordSegment.o daxpy.o ddot.o dnrm2.o DocumentVector.o dscal.o LangUtils.o Lexicon.o LiblinearTextClassifier.o linear.o ThuctcClassify.o tron.o
clean::
	rm -f *.o