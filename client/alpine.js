import axios from 'axios';

export default function Login() {
    return {
        user: null,
        username: null,
        passwordReg: null,
        name: null,
        surname: null,
        password: null,
        hello: null,
        open: false,
        hide: true,
        loginError: '',
        movieName: null,
        movies: [],
        showError: false,
        hide: false,
        loginSection: false,
        registerSection: true,
        description: null,
        image: null,
        moviename: null,
        userid: null,
        favs: [],
        showFavs: false,
        showSearchResults: false,
        registerMessage:false,
        message: null,
        signInSection:true,
        success:false,

        loggingIn() {
            const username = this.user
            const password = this.password

            axios
                .post('http://localhost:3022/api/login', { username, password })
                .then((result) => {
                    console.log(result.data)
                    if (result.data.success == true) {
                        console.log('yay')
                        this.open = true
                        this.hide = false
                        this.hello = `Hello ${result.data.firstname} ${result.data.lastname}`
                        this.userid = result.data.id
                        this.registerMessage = false
                    }
                    else if(result.data.status == 'user does not exist'){
                        this.message = 'Looks like you have not registered yet. Register here'
                        this.loginSection = false
                        this.registerSection =true
                    }
                    else if (username == null || password == null) {
                        this.loginError = 'Please enter all the input fields'
                        this.showError = true
                        this.loginSection = true
                    }
                    else {
                        this.loginError = 'Invalid username or password'
                        this.showError = true
                        this.loginSection = true
                    }

                    setTimeout(() => {
                        this.loginError = '';
                        this.showError = false
                    }, 3000);

                })

        },
        register() {
            const username = this.username
            const password = this.passwordReg
            const firstName = this.name
            const lastName = this.surname

            axios
                .post('http://localhost:3022/api/signup', { username, password, firstName, lastName })
                .then((result) => {
                    console.log(result.data)
                    if (result.data.status == 'success') {
                        console.log('yay')
                        this.user = null
                        this.password = null
                        // this.name = null
                        // this.surname = null
                        this.registerMessage = true
                        this.loginSection = true
                        this.registerSection =false
                        this.signInSection=false

                        this.hide = false
                    }

                    else if (result.data.status == 'registration exists') {
                        this.loginError = 'Looks like you have an account already'
                        this.showError = true
                        this.username = null
                        this.passwordReg = null
                        this.name = null
                        this.surname = null
                    }

                    else if (!username || !password || !firstName || !lastName) {
                        this.loginError = 'Please enter all the input fields'
                        this.showError = true
                    }

                    setTimeout(() => {
                        this.loginError = '';
                        this.showError = false
                    }, 3000);

                })
        },
        showMovie() {
            axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=aed49f1a54de76e893c5d081c853c6eb&query=${this.movieName}`)
                .then((result) => {
                    console.log(result.data.results)
                    this.movies = result.data.results
                    this.showSearchResults = true
                    this.showFavs = false
                })

        },
        addToPlaylist() {
            console.log('checking' + this.moviename + this.image + this.userid)

            const title = this.moviename
            const image = this.image
            const userId = this.userid
            // this.popup = 'Added to list'
            this.success = true

            axios
                .post('http://localhost:3022/api/favplaylist', { title, image, userId })
                .then((result) => {
                    console.log(result.data)
                    if (result.data.status == 'successfully inserted') {
                        console.log('inserted to table')
                    }
                })
        },

        displayFavs() {
            console.log('jdjdjf ' + this.userid)

            const userId = Number(this.userid)

            axios
                .get(`http://localhost:3022/api/favPlaylist/${userId}`)
                .then((result) => {
                    console.log(result.data.data)
                    this.favs = result.data.data
                    console.log('uuu' + JSON.stringify(this.favs))
                    this.showFavs = true
                    this.showSearchResults = false
                })

        },
        removeFav() {
            console.log('asdfgnjm' + this.moviename);

            axios
                .delete(`http://localhost:3022/api/favPlaylist/${this.moviename}`)
                .then((result) => {
                    console.log(result.data)
                })

        },
        displayMovies(){
            axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=aed49f1a54de76e893c5d081c853c6eb&language=en-US&page=1`)
            .then((result) => {
                console.log(result.data.results)
                this.movies = result.data.results
                this.showSearchResults = true
                this.showFavs = false
            })
        }
    }
}