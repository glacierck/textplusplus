drop database if exists thunlp;

create database thunlp;

use thunlp;

grant select, insert, update, delete on thunlp.* to 'root'@'localhost' identified by 'thunlp';

create table user(
    id VARCHAR(50) not null,
    email VARCHAR(50) not null,
    password VARCHAR(50) not null,
    token VARCHAR(50) not null,
    create_at REAL not null,
    last_login REAL not null,
    token_time REAL not null,
    admin BOOLEAN not null,
    PRIMARY KEY (id),
    UNIQUE INDEX (email)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


create table tokeninfo(
    user VARCHAR(50) not null,
    lac_limit_times Integer not null,
    lac_last_time REAL not null,
    lac_frequen REAL not null,
    PRIMARY KEY (user)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table lac(
    user VARCHAR(50) not null,
    PRIMARY KEY (user)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;