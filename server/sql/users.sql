create table movie_user(
	id serial not null primary key,
	username text not null,
	firstname text not null,
	lastname text not null,
	password text not null
);

create table user_movies(
    id serial not null primary key,
    user_id int not null,
	title text,
	image text,
    foreign key (user_id) references movie_user(id)
);