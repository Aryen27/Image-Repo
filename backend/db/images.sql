use club_elite;

create table imgrepo(imgid int not null auto_increment primary key, title varchar(255) not null, about text not null, userid int not null, createdAt timestamp default current_timestamp not null, updatedAt timestamp default current_timestamp on update current_timestamp not null, foreign key (userid) references users(uid) on delete cascade);