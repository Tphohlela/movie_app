create table movie_user(
	id serial not null primary key,
	username text not null,
	firstname text not null,
	lastname text not null,
	password text null
);

create table user_movies(
    id serial not null primary key,
    user_id int not null,
	title text,
	image text,
    foreign key (user_id) references movie_user(id)
);

"user_playlist":  {
"id": 1,
"user_id": 1,
"movie_list" : [
{ id: 12, movieName : “Movie 1 name”, moviePosterURL: “” },
{ id: 17, movieName : “Movie 2 name”, moviePosterURL:“” }
{ id: 23, movieName : “Movie 3 name”, moviePosterURL: “” }
],

{"adult":false,"backdrop_path":"/tTlAA0REGPXSZPBfWyTW9ipIv1I.jpg","genre_ids":[28,12,878,18],
"id":315635,"original_language":"en","original_title":"Spider-Man: Homecoming",
"overview":"Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.",
"popularity":186.831,"poster_path":"/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg","release_date":"2017-07-05",
"title":"Spider-Man: Homecoming","video":false,"vote_average":7.4,"vote_count":18743},

checkingSunday night's Pyramid Stage has never quite seen a headliner like Beyoncé. The former Destiny's Child singer watched from side of stage as husband Jay-Z blew Noel Gallagher and half of Pilton away with an extraordinary set three years ago, and returned in 2011 to take on Glasto for herself. The Texan's stunning entrance confirmed that Knowles knows how to put on a show, and one of the biggest crowds the Pyramid stage has ever seen were delighted to be greeted by Sasha at her fiercest. This set, peppered with Prince and Kings Of Leon covers alongside the biggest hits of Beyoncé's career will be remembered long after the grass has re-sprouted on the fields of Worthy farm.Beyoncé: Live at Glastonbury 2011/uwxQoFtlvY1sQ4u0WObnCfhm3C2.jpg1