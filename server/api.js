module.exports = function (app, db) {

    app.get('/api/test', function (req, res) {
        res.json({
            name: 'joe'
        });
    });

    app.post('/api/login', async function (req, res) {
        try {
            const { username, password } = req.body;

            let checkUser = [];

            checkUser = await db.oneOrNone("select * from movie_user where username=$1", [username])
            let name = await db.oneOrNone("select firstname from movie_user where username=$1", [username])
            let surname = await db.oneOrNone("select lastname from movie_user where username=$1", [username])
            let checkPassword = await db.oneOrNone("select password from movie_user where username=$1", [username])
            let getId = await db.oneOrNone("select id from movie_user where username=$1", [username])
            console.log('sdfghnm' + JSON.stringify(checkUser))
            console.log('sdfghnm' + JSON.stringify(name))
            console.log('sdfghnm' + JSON.stringify(surname))

            if (checkUser != null && checkPassword.password == password) {
                return res.json({
                    success: true,
                    id: getId.id,
                    firstname: name.firstname,
                    lastname: surname.lastname,
                })
            }
            else if (checkUser != null && checkPassword.password != password) {
                return res.json({
                    status: "wrong password",
                    firstname: name.firstname,
                    lastname: surname.lastname,
                })
            }

            else {
                res.json({
                    status: 'user does not exist',
                });
            }

        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });

    app.post('/api/signup', async function (req, res) {

        try {
            const { username, firstName, lastName, password } = req.body;

            let check = []

            check = await db.oneOrNone("select * from movie_user where username=$1", [username])

            console.log('sdfghj' + JSON.stringify(check))

            if (check == null) {
                await db.oneOrNone("insert into movie_user(username,firstname,lastname,password) values ($1,$2,$3,$4)", [username, firstName, lastName, password])
                // let getId = await db.oneOrNone("select id from movie_user where username=$1",[username])
                res.json({
                    status: 'success',
                    // id: getId.id,
                    firstname: firstName,
                    lastname: lastName,
                });
            }
            else {
                res.json({
                    status: 'registration exists',
                });
            }


        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });

    app.post('/api/favplaylist', async function (req, res) {

        try {
            const { userId, title, image } = req.body;

            let check = [];

            check = await db.oneOrNone("select * from user_movies where user_id=$1 and title=$2", [userId, title])

            console.log('sdfghj' + JSON.stringify(check))

            if (check == null) {
                await db.oneOrNone("insert into user_movies(user_id,title,image) values ($1,$2,$3)", [userId, title, image])
                res.json({
                    status: 'successfully inserted'
                });
            }
            else{
                res.json({
                    status: 'movie already inserted'
                });
            }

        }

        catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });

    app.get('/api/favPlaylist/:userid', async function (req, res) {
        try {
            let result = []

            const userId = Number(req.params.userid);

            result = await db.manyOrNone("select * from user_movies where user_id = $1", [userId])

            res.json({
                data: result
            })
        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });

    app.delete('/api/favPlaylist/:title', async function (req, res) {
		
        try {
            let result = []

            const movie = req.params.title;

            result = await db.none("delete from user_movies where title = $1", [movie])

            res.json({
                data: result
            })
        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
	});
}