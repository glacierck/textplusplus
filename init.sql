drop database if exists thunlp;

create database thunlp;

use thunlp;

grant select, insert, update, delete on thunlp.* to 'root'@'localhost' identified by 'thunlp';
