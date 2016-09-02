#include <iostream>
#include <vector>
#include <ctime>
#include <fstream>
#include <algorithm>
#include <stdlib.h>
#include <netinet/in.h>
#include <unistd.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <sys/un.h>
#include <string.h>
#include "ThuctcClassify.h"
using namespace std;
using namespace thunlp;

int main() 
{
    ThuctcClassify* classifier = new ThuctcClassify();

    string cid;
    vector<pair<string,float>> result;


    char **p;
    struct sockaddr_un s_un;//server address structure
    struct sockaddr_un c_un;//client address structure
    int fd,c_fd,lent;
    socklen_t len;
    char buf[65536];
    char a[65536];

    memset((void *)&s_un,0,sizeof(s_un));    
    s_un.sun_family = AF_UNIX;

    unlink("/tmp/ctc.sock");
    strncpy(s_un.sun_path,"/tmp/ctc.sock",sizeof(s_un.sun_path)-1);

    fd = socket(AF_UNIX,SOCK_STREAM,0);//socket(int domain, int type, int protocol)

  
    bind(fd,(struct sockaddr *)&s_un,sizeof(s_un));

    listen(fd,10);//lisiening start

    while(1)
    {
        len = sizeof(c_un);    
        c_fd = accept(fd,(struct sockaddr *)&c_un,&len);

        int n = read(c_fd,buf,65536);//read the message send by client
        char* s = buf;
        classifier->DoClassify(s,result);
        cid = result[0].first;
        cout<<cid<<endl;
        std::string ans = cid;
        write(c_fd,ans.c_str(),ans.length());//sent message back to client

        close(c_fd);
    }
    return 0;
}
