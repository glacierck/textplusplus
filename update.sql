use thunlp;

grant select, insert, update, delete on thunlp.* to 'root'@'localhost' identified by 'thunlp';

create table ctc(
    user VARCHAR(50) not null,
    PRIMARY KEY (user)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table tokeninfo add ctc_limit_times Integer;
alter table tokeninfo add ctc_last_time REAL;
alter table tokeninfo add ctc_frequen REAL;
INSERT INTO ctc(user) VALUES('admin');