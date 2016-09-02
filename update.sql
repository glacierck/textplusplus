use thunlp;

grant select, insert, update, delete on thunlp.* to 'root'@'localhost' identified by 'thunlp';

create table ctc(
    user VARCHAR(50) not null,
    PRIMARY KEY (user)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO ctc(user) VALUES('admin')