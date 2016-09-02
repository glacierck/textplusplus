#include <vector>
#include <algorithm>
#include <iostream>
#include "ThuctcClassify.h"
#include "ClassifyResult.h"
#include "BasicTextClassifier.h"
#include "LinearBigramChineseTextClassifier.h"
using namespace thunlp;

BasicTextClassifier* ThuctcClassify::initClassifier(const std::string& model)
{
    BasicTextClassifier* classifier = new BasicTextClassifier();
    classifier->loadCategoryListFromFile(model+"/category");
    classifier->setTextClassifier(new LinearBigramChineseTextClassifier(classifier->getCategorySize()));
    classifier->getTextClassifier()->loadModel(model);
    return classifier;
}

ThuctcClassify::ThuctcClassify()
{
    std::string root_filepath = "tencent_model";
    classifier = initClassifier(root_filepath);
}

bool ThuctcClassify::DoClassify(const std::string &content, std::vector<std::pair<std::string,float>> &classify_vector, int topn)
{
    std::vector<ClassifyResult> returned;
    ClassifyResult returned0(0,1),returned1(0,1);
    
    float confidence;
    classify_vector.clear();
    returned = classifier->classifyText(content, topn);
//    std::cout<<returned[0].probability_<<std::endl;

//    if(returned[0].probability_ < threshold)
//        return false;
    
    for(int i = 0; i < topn; i++)
    {
      confidence = returned[i].probability_;
      classify_vector.push_back(std::make_pair(classifier->getCategoryName(returned[i].label_),confidence));
    }

    return true;
}