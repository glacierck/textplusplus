#include <vector>
#include <algorithm>
#include "ClassifyResult.h"
#include "BasicTextClassifier.h"
#include "LinearBigramChineseTextClassifier.h"
using namespace thunlp;

class ThuctcClassify
{
	const double threshold = 0.95;
	
	BasicTextClassifier* initClassifier(const std::string& model);
	BasicTextClassifier* classifier;

public:
	ThuctcClassify();
	bool DoClassify(const std::string &content, std::vector<std::pair<std::string,float>> &classify_vector, int top = 5);
};