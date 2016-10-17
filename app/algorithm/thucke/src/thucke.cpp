#include <stdio.h>
#include <iostream>
#include <fstream>
#include <cstring>
#include <getopt.h>
#include <sys/types.h>
#include <dirent.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <unistd.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <sys/un.h>
#include <string.h>

#include "thucke/keyword.h"

int is_dir_exist(const char *);
std::string join_path(const char *, const char *);

int main( int argc, char **argv ) {
    int num = 30;
    char * num_keywords;
    const char * model_path = "res";
    std::string input_text;

    keyword mykeyword = keyword();
    std::string model_path_thulac, model_path_thucke;

    try {
        model_path_thulac = join_path(model_path, "thulac_models");
    }
    catch (std::string){
        printf("invalid model_path: %s\n", model_path);
    }
    try {
        model_path_thucke = join_path(model_path, "thucke_models");
    }
    catch (std::string){
        printf("invalid model_path: %s\n", model_path);
    }

    mykeyword.init(model_path_thulac, model_path_thucke);

//    printf("extrated keywords are:\n%s", result.c_str());

    char **p;
    struct sockaddr_un s_un;//server address structure
    struct sockaddr_un c_un;//client address structure
    int fd,c_fd,lent;
    socklen_t len;
    char buf[65536];
    char a[65536];

    memset((void *)&s_un,0,sizeof(s_un));    
    s_un.sun_family = AF_UNIX;

    unlink("/tmp/cke.sock");
    strncpy(s_un.sun_path,"/tmp/cke.sock",sizeof(s_un.sun_path)-1);

    fd = socket(AF_UNIX,SOCK_STREAM,0);//socket(int domain, int type, int protocol)

  
    bind(fd,(struct sockaddr *)&s_un,sizeof(s_un));

    listen(fd,10);//lisiening start
    char tmpbuf[10];
    while(1)
    {
        len = sizeof(c_un);    
        c_fd = accept(fd,(struct sockaddr *)&c_un,&len);

        int n = read(c_fd,buf,65536);//read the message send by client
        char* s = buf;
    	std::string result = mykeyword.getKeyword(s, num);
        write(c_fd,result.c_str(),result.length());//sent message back to client

        close(c_fd);
    }

    return 0;
}

int is_dir_exist(const char * dir_path) {
    if (dir_path == NULL) {
        return -1;
    }
    if (opendir(dir_path) == NULL) {
        return -1;
    }
    return 0;
}

std::string join_path(const char * pre, const char * suf) {
    std::string prefix = pre;
    std::string suffix = suf;
    if (0 != is_dir_exist(prefix.c_str())) {
        throw prefix;
    }
    if (prefix.substr(prefix.length() - 1, 1).compare("/") != 0) {
        prefix = prefix + "/";
    }
    return prefix + suffix + "/";
}
