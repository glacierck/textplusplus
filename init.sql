drop database if exists thunlp;

create database thunlp;

use thunlp;

grant select, insert, update, delete on thunlp.* to 'root'@'localhost' identified by 'thunlp';

create table users (
    `id` varchar(50) not null,
    `email` varchar(50) not null,
    `password` varchar(50) not null,
    `admin` bool not null,
    `token` varchar(50) not null,
    `phone` varchar(50) not null,
    `created_at` real not null,
    `last_login` real not null,
    `token_time` real not null,
    unique key `idx_email` (`email`),
    key `idx_created_at` (`created_at`),
    primary key (`id`)
) engine=innodb default charset=utf8;
