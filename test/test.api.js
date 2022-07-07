const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()

const API = require('../server/api');
const { default: axios } = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://gary:gar123@localhost:5432/movie_app';
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);

API(app, db);

describe('The Movie API', function () {

	before(async function () {
		this.timeout(5000);
		await db.none(`delete from user_movies`);
		await db.none(`delete from movie_user`);

		const commandText = fs.readFileSync('./server/sql/data.sql', 'utf-8');
		await db.none(commandText)
	});


	it('should have a test method', async () => {

		const response = await supertest(app)
			.get('/api/test')
			.expect(200);

		assert.deepStrictEqual({ name: 'joe' }, response.body);

	});

	it('should add user details when user registers', async () => {

		const checkRegistration = await supertest(app).post('/api/signup').send({
			username: 'Laika',
			firstName: 'Malaika',
			lastName: 'Petoors',
			password: 'password03',
		});

		assert.equal('success', checkRegistration.body.status);
	});

	it('should return registration exists if user is already registered', async () => {

		const checkRegistration = await supertest(app).post('/api/signup').send({
			username: 'TT',
			firstName: 'Thato',
			lastName: 'Phohlela',
			password: 'password01',
		});
		assert.equal('registration exists', checkRegistration.body.status);
	});

	it('should be able to login if registered', async () => {

		const checkLogin = await supertest(app).post('/api/login').send({
			username: 'TT',
			password: 'password01',
		});
		assert.equal(true, checkLogin.body.success);
	});

	it('if user enters a different password then wrong password message should appear', async () => {

		const checkLogin = await supertest(app).post('/api/login').send({
			username: 'TT',
			password: 'password05',
		});
		assert.equal('wrong password', checkLogin.body.status);
	});

	it('if user has not registered then user does not exist message should appear', async () => {

		const checkLogin = await supertest(app).post('/api/login').send({
			username: 'Bey',
			password: 'password01',
		});
		assert.equal('user does not exist', checkLogin.body.status);
	});

	it('user should be able to add a favourite movie', async () => {

		const checkLogin = await supertest(app).post('/api/login').send({
			username: 'TT',
			password: 'password01',
		});

		const id = checkLogin.body.id

		const favPlaylist = await supertest(app).post('/api/favplaylist').send({
			userId: id,
			title: 'Homecoming: A Film by BeyoncΘ',
			image: '/nKdP4K3Bj3qnjtDCq9lTg7UOHVy.jpg'
		});
		assert.equal('successfully inserted', favPlaylist.body.status);
	});

	it('user should not be able to add duplicate favourite movies', async () => {

		const checkLogin = await supertest(app).post('/api/login').send({
			username: 'TT',
			password: 'password01',
		});

		const id = checkLogin.body.id

		await supertest(app).post('/api/favplaylist').send({
			userId: id,
			title: 'Homecoming: A Film by BeyoncΘ',
			image: '/nKdP4K3Bj3qnjtDCq9lTg7UOHVy.jpg'
		});

		const favPlaylist = await supertest(app).post('/api/favplaylist').send({
			userId: id,
			title: 'Homecoming: A Film by BeyoncΘ',
			image: '/nKdP4K3Bj3qnjtDCq9lTg7UOHVy.jpg'
		});
		assert.equal('movie already inserted', favPlaylist.body.status);
	});

	it('should return the users playlist movie titles and movie posters', async () => {
		const checkLogin = await supertest(app).post('/api/login').send({
			username: 'TT',
			password: 'password01',
		});

		const id = checkLogin.body.id

		const results = await supertest(app)
			.get('/api/favPlaylist/' + id)
			.expect(200);

		const favMovies = results.body.data;

		const listWithNoIds = favMovies.map(favMovie => {
			delete favMovie.id;
			delete favMovie.user_id;
			return favMovie;
		})
		assert.deepEqual([
			{
				image: '/nKdP4K3Bj3qnjtDCq9lTg7UOHVy.jpg',
				title: 'Homecoming: A Film by BeyoncΘ',
			}
		], listWithNoIds);

	})

	it('you should be able to remove a movie', async () => {

		const removeMovie = await supertest(app).delete(`/api/favPlaylist/` + encodeURI('Homecoming: A Film by BeyoncΘ')).expect(200)

		assert.equal('deleted', removeMovie.body.data);
	});

	after(() => {
		db.$pool.end();
	});
});