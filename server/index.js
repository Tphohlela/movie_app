const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()
const API = require('./api');
const { default: axios } = require('axios');
const cors = require('cors')

const app = express();


const pgp = PgPromise({});

const DATABASE_URL= process.env.DATABASE_URL || "postgres://gary:gar123@localhost:5432/movie_app";

const config = { 
	connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
	config.ssl = { 
		rejectUnauthorized : false
	}
}

const db = pgp(config)

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
 
// const db = pgp(DATABASE_URL);
API(app, db);
const PORT = process.env.PORT || 3022;
// API routes to be added here
app.get('/', async function(req, res) {
    console.log(req.query)
});
app.listen(PORT, function() {
    console.log(`App started on port ${PORT}`)
});
