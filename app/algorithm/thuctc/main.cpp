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
#include <errno.h>
#include "ThuctcClassify.h"
using namespace std;
using namespace thunlp;

int main() 
{
    ThuctcClassify* classifier = new ThuctcClassify();

    string cid;
    vector<pair<string,float>> result;
    int ret = 0;

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

    if(fd < 0){
        perror("socket");
        exit(errno);
    }
  
    ::bind(fd,(struct sockaddr *)&s_un,sizeof(s_un));
    ret = listen(fd,10);//lisiening start
    if(ret != 0){
        perror("listen");
        exit(errno);
    }
    cerr << "after listen\n";
    char tmpbuf[10];
    while(1)
    {
        len = sizeof(c_un);    
        c_fd = accept(fd,(struct sockaddr *)&c_un,&len);

        int n = read(c_fd,buf,65536);//read the message send by client
        char* s = buf;
        classifier->DoClassify(s,result,5);
        std::string ans = "";
        for(int i = 0;  i < 5; i++)
        {
            gcvt(result[i].second,3,tmpbuf);
            string tmp1 = tmpbuf;
            ans += (result[i].first + "\t") ;
            ans += (tmp1 + "\n");
        }
        write(c_fd,ans.c_str(),ans.length());//sent message back to client

        close(c_fd);
    }
    return 0;
}
