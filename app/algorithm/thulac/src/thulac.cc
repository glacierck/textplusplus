#include "thulac_base.h"
#include "preprocess.h"
#include "postprocess.h"
#include "punctuation.h"
#include "cb_tagging_decoder.h"
#include "chinese_charset.h"
#include "thulac.h"
#include "filter.h"
#include "timeword.h"
#include "verbword.h"
#include "negword.h"
#include "wb_extended_features.h"
#include "wb_lattice.h"
#include "bigram_model.h"
#include <fstream>
using namespace thulac;
using std::cout;
using std::endl;
void showhelp()
{
    std::cerr<<"Command line usage:"<<std::endl;
    std::cerr<<"./thulac [-t2s] [-seg_only] [-filter] [-deli delimeter] [-user userword.txt] [-model_dir dir]"<<std::endl;
    std::cerr<<"or"<<std::endl;
    std::cerr<<"./thulac [-t2s] [-seg_only] [-filter] [-deli delimeter] [-user userword.txt] <inputfile >outputfile"<<std::endl;
    std::cerr<<"\t-t2s\t\t\ttransfer traditional Chinese text to Simplifed Chinese text"<<std::endl;
    std::cerr<<"\t-seg_only\t\tsegment text without Part-of-Speech"<<std::endl;
    std::cerr<<"\t-filter\t\t\tuse filter to remove the words that have no much sense, like \"could\""<<std::endl;
    std::cerr<<"\t-deli delimeter\t\tagsign delimeter between words and POS tags. Default is _"<<std::endl;
    std::cerr<<"\t-user userword.txt\tUse the words in the userword.txt as a dictionary and the words will labled as \"uw\""<<std::endl;
    std::cerr<<"\t-model_dir dir\t\tdir is the directory that containts all the model file. Default is \"models/\""<<std::endl;
}

class ThuLac
{

    char* user_specified_dict_name=NULL;
    char* model_path_char = NULL;


    Character separator = '_';

    std::string prefix = "model/thulac/";
    bool useT2S = false;
    bool seg_only = false;
    bool useFilter = false;
    bool use_second = true;

    TaggingDecoder* cws_decoder=new TaggingDecoder();


    permm::Model* cws_model;
    DAT* cws_dat;
    char** cws_label_info = NULL;
    int** cws_pocs_to_tags = new int*[16];

    TaggingDecoder* tagging_decoder = NULL;
    permm::Model* tagging_model = NULL;
    DAT* tagging_dat = NULL;
    char** tagging_label_info = NULL;
    int** tagging_pocs_to_tags = NULL;    

    
    int rtn=1;

    Preprocesser* preprocesser = NULL;
    Postprocesser* user_dict = NULL;
    LatticeFeature* lf;
    DAT* sogout;
    Postprocesser* ns_dict = NULL;
    Postprocesser* idiom_dict = NULL;
    Postprocesser* nz_dict = NULL;
    Postprocesser* ni_dict = NULL;
    Postprocesser* noun_dict = NULL;
    Postprocesser* adj_dict = NULL;
    Postprocesser* verb_dict = NULL;
    Postprocesser* y_dict = NULL;

    Punctuation* punctuation = NULL;

    NegWord* negword = NULL;
    TimeWord* timeword = NULL;
    VerbWord* verbword = NULL;

    hypergraph::Decoder<int,LatticeEdge> decoder;


    Filter* filter = NULL;

    clock_t start = clock();
    std::vector<thulac::RawSentence> vec;

public:
    void InitModel()
    {
        cws_model = new permm::Model((prefix+"cws_model.bin").c_str());
        cws_dat = new DAT((prefix+"cws_dat.bin").c_str());
        cws_label_info = new char*[cws_model->l_size];

        lf = new LatticeFeature();
        sogout=new DAT((prefix+"sgT.dat").c_str());
        lf->node_features.push_back(new SogouTFeature(sogout));

        std::vector<std::string> n_gram_model;
        std::vector<std::string> dictionaries;
        dictionaries.push_back(prefix+"sgW.dat");
        for(int i=0;i<dictionaries.size();++i){
            lf->node_features.push_back(new DictNodeFeature(new DAT(dictionaries[i].c_str())));
        }
        lf->filename=prefix+"model_w";
        lf->load();
        decoder.features.push_back(lf);

        preprocesser = new Preprocesser();
        preprocesser->setT2SMap((prefix+"t2s.dat").c_str());

        ns_dict = new Postprocesser((prefix+"ns.dat").c_str(), "ns", false);
        idiom_dict = new Postprocesser((prefix+"idiom.dat").c_str(), "i", false);
        nz_dict = new Postprocesser((prefix+"nz.dat").c_str(), "nz", false);
        ni_dict = new Postprocesser((prefix+"ni.dat").c_str(), "ni", false);
        noun_dict = new Postprocesser((prefix+"noun.dat").c_str(), "n", false);
        adj_dict = new Postprocesser((prefix+"adj.dat").c_str(), "a", false);
        verb_dict = new Postprocesser((prefix+"verb.dat").c_str(), "v", false);
        y_dict = new Postprocesser((prefix+"y.dat").c_str(), "y", false);

        punctuation = new Punctuation((prefix+"singlepun.dat").c_str());

        negword = new NegWord((prefix+"neg.dat").c_str());
        timeword = new TimeWord();
        verbword = new VerbWord((prefix+"vM.dat").c_str(), (prefix+"vD.dat").c_str());

    }

    ThuLac(int argc,char **argv)
    {
        int c = 1;
        while(c < argc){
            std::string arg = argv[c];
            if(arg == "-t2s"){
                useT2S = true;
            }else if(arg == "-user"){
                user_specified_dict_name = argv[++c];
            }else if(arg == "-deli"){
                separator = argv[++c][0];
            }else if(arg == "-seg_only"){
                seg_only = true;
            }else if(arg == "-filter"){
                useFilter = true;
            }else if(arg == "-model_dir"){
                model_path_char = argv[++c];
            }else{
                showhelp();
                return;
            }
            c++;
        }
  

        if(model_path_char != NULL){
            prefix = model_path_char;
            if(*prefix.rbegin() != '/'){
                prefix += "/";
            }
        }else{
            //std::string a = getcwd(NULL, 0);
            prefix = "model/thulac/";
        }

        InitModel();

        if(seg_only){
            cws_decoder->threshold=0;
        }else{
            cws_decoder->threshold=15000;
        }


        get_label_info((prefix+"cws_label.txt").c_str(), cws_label_info, cws_pocs_to_tags);
        cws_decoder->init(cws_model, cws_dat, cws_label_info, cws_pocs_to_tags);
        cws_decoder->set_label_trans();

        if(!seg_only){
            tagging_decoder = new TaggingDecoder();
            tagging_decoder->separator = separator;
            if(use_second){
                tagging_decoder->threshold = 10000;
            }else{
                tagging_decoder->threshold = 0;
            }
            tagging_model = new permm::Model((prefix+"model_c_model.bin").c_str());
            tagging_dat = new DAT((prefix+"model_c_dat.bin").c_str());
            tagging_label_info = new char*[tagging_model->l_size];
            tagging_pocs_to_tags = new int*[16];
        
            get_label_info((prefix+"model_c_label.txt").c_str(), tagging_label_info, tagging_pocs_to_tags);
            tagging_decoder->init(tagging_model, tagging_dat, tagging_label_info, tagging_pocs_to_tags);
            tagging_decoder->set_label_trans();
        }
     
        
        //printf("%d\n",access("thulac.cc",0));
       

        if(user_specified_dict_name)
        {
            user_dict = new Postprocesser(user_specified_dict_name, "uw", true);
        }
        if(useFilter)
        {
            filter = new Filter((prefix+"xu.dat").c_str(), (prefix+"time.dat").c_str());
        }
    }

    const char* run(char* s)
    {

        POCGraph poc_cands;
        POCGraph new_poc_cands;
        thulac::RawSentence raw;
        thulac::RawSentence oiraw;
        thulac::RawSentence traw;
        thulac::SegmentedSentence segged;
        thulac::TaggedSentence tagged;

        thulac::get_raw(oiraw, s, strlen(s));//读入生句子
        if(useT2S)
        {            
            preprocesser->clean(oiraw,traw,poc_cands);
            preprocesser->T2S(traw, raw);
        }
        else
        {
            preprocesser -> clean(oiraw,raw,poc_cands);
        }
                
        if(raw.size())
        {
                
            std::string ret="";
            cws_decoder->segment(raw, poc_cands, new_poc_cands);
            if(!seg_only)
            {

                if(use_second){
                    Lattice lattice;
                    hypergraph::Graph graph;
                    tagging_decoder->segment(raw, new_poc_cands, lattice);
                    hypergraph::lattice_to_graph(lattice, graph);
                    decoder.decode(graph);
                    hypergraph::graph_to_lattice(graph,lattice,1);
                    lattice_to_sentence(lattice,tagged, (char)separator);
                }else{
                    tagging_decoder->segment(raw,poc_cands,tagged);
                    tagging_decoder->segment(raw, new_poc_cands, tagged);
                    //tagging_decoder->segment(raw, poc_cands, tagged);
                }

                ns_dict->adjust(tagged);
                idiom_dict->adjust(tagged);
                nz_dict->adjust(tagged);
                ni_dict->adjust(tagged);
                noun_dict->adjust(tagged);
                adj_dict->adjust(tagged);
                verb_dict->adjust(tagged);
                // vm_dict->adjustSame(tagged);
                y_dict->adjustSame(tagged);

                if(user_dict){
                    user_dict->adjust(tagged);
                }
                punctuation->adjust(tagged);
                timeword->adjustDouble(tagged);
                negword->adjust(tagged);
                verbword->adjust(tagged);
                if(useFilter){
                    filter->adjust(tagged);
                }
                

                //输出
                //std::cout<<tagged;//输出
                ret = tagged.getString();

                //std::ofstream out("out2.txt");
                //out<<tagged;
                
            }
                    
            else 
            {
                cws_decoder->segment(raw, poc_cands, new_poc_cands);
                cws_decoder->get_seg_result(segged);
                ns_dict->adjust(segged);
                idiom_dict->adjust(segged);
                nz_dict->adjust(segged);
                noun_dict->adjust(segged);
                if(user_dict){
                    user_dict->adjust(segged);
                }
                punctuation->adjust(segged);
                timeword->adjust(segged);
                if(useFilter){
                    filter->adjust(segged);
                }
                        
                for(int j = 0; j < segged.size(); j++)
                {
                    if(j!=0)
                    ret = ret + " ";
                    //std::cout<<segged[j];
                    ret = ret + segged[j].getString();
                }
            }
            return ret.c_str();
            //cout<<endl;
        }
    }
};


extern "C" {
    ThuLac* Thulac_new(){ char **p; return new ThuLac(0,p); }
    const char* Thulac_run(ThuLac* Thulac, char* s){return Thulac->run(s); }
}