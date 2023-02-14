//Import the express and body-parser modules
const express = require('express');
const express_session = require('express-session');
const file_upload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require("path");
const PORT = process.env.PORT || 5000;

//Import database functions
const db = require('./database');
const {
    json,
    type
} = require("express/lib/response");
const {
    error
} = require('console');


// db.connect((error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("MYSQL Connected...");
//     }
// })

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());
app.use(file_upload());

const public_directory = path.join(__dirname, "./public")
app.use(express.static(public_directory))

//Configure express app and configure it to express-session
app.use(
    express_session({
        secret: "cst2120 secret",
        cookie: {
            maxAge: 600000
        },
        resave: false,
        saveUninitialized: true
    })
)


//Set up express to serve static files from the directory called 'public'
app.use(express.static('public'));


//Set up application to handle GET requests sent to the user path
app.get('/check-login', check_login);
app.get('/logout', logout);
app.get('/movies', get_movies);
app.get('/search/*', search_movies);
app.get('/update-movie/*', get_update_movies);
app.get('/movies-profile', get_movies_profile);
app.get('/movies/*', get_selected_movie);
app.get('/comments/*', get_movie_comments);

//Set up application to handle POST requests sent to the user path
app.post('/update-movie', update_movie);
app.post('/delete-movie', delete_movie);
app.post('/register-user', register_user); //Adds a new user
app.post('/add-movie', insert_movie);
app.post('/login-user', login_user);
app.post('/add-review', add_reviews);

//Start the app listening on port 8080
app.get("/", (request, response) => {
    response.render("index")
})

app.listen(PORT, () => {
    console.log("Server started on port http://localhost:" + PORT + "/");
})

function delete_movie(request, response) {

    let movie = request.body
    db.delete_movie(movie.movie_id, response);
}


function get_movie_comments(request, response) {
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var movie_id = pathArray[pathArray.length - 1];

    // if (pathEnd !== 'comments') {
    // let movie_id = parseInt(pathEnd)
    db.fetch_all_comments(movie_id, response);
    // } else {
    //     response.send("{'error':'Path not recognized'}");
    // }
}

function search_movies(request, response) {
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var search_word = pathArray[pathArray.length - 1];

    console.log("server search word" + search_word);

    db.fetch_search_results(search_word, response);
}

function get_movies(request, response) {
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var pathEnd = pathArray[pathArray.length - 1];

    if (pathEnd === 'movies') {
        db.fetch_all_movies(response);
    } else {
        response.send("{error:'Path not recognized'}");
    }
}

function get_update_movies(request, response) {
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var movie_id = pathArray[pathArray.length - 1];

    console.log("Data received by Server: " + JSON.stringify(movie_id));
    db.fetch_all_update_movies(movie_id, response);
}

function get_movies_profile(request, response) {
    //Split the path of the request into its components
    var pathArray = request.url.split("/");
    let username = request.session.username


    //Get the last part of the path
    var pathEnd = pathArray[pathArray.length - 1];

    if (pathEnd === 'movies-profile') {
        db.fetch_all_movies_profile(username, response);
    } else {
        response.send("{error:'Path not recognized'}");
    }
}


function get_selected_movie(request, response) {
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var movie_id = pathArray[pathArray.length - 1];

    console.log("Data received by Server: " + JSON.stringify(movie_id));
    db.fetch_selected_movie(movie_id, response);

    // response.send("{error:'Path not recognized'}");
}


// Getting the request which has user in it
async function login_user(request, response) {
    let user_login = request.body;
    let user = JSON.stringify(
        // returns Javascript array that is being converted to JSON format
        await db.fetch_user(user_login.username, user_login.password)
    );

    //Checking if the user exists
    // If user is not empty
    if (user != "[]") {
        // converting back to array
        let users = JSON.parse(user);
        request.session.username = users[0].username;
        response.send('{"found": "true", "users":' + user + "}")
        console.log('{"found": "user"}');
    } else {
        console.log('{"found": "false"}');
        response.send('{"found": "false"}');
    }
}


function check_login(request, response) {
    if (!("username" in request.session)) {
        response.send('{"login": false}');
        return false
    } else {
        let user = request.session.username
        response.send(JSON.stringify(user))
        return true
    }
}

function logout(request, response) {
    //Destroys session
    request.session.destroy((error) => {
        if (error) {
            // console.log("you have reach if error");
            response.send('{"error":' + JSON.stringify(error) + "}");
        } else {
            // console.log("you have reach else error");
            response.send('{"login": "false"}');
        }
    })
}


function add_reviews(request, response) {
    let user = request.body

    console.log("Add Comment: Data received by Server: " + JSON.stringify(user));

    if (!("username" in request.session)) {
        response.send('{"result": "Please login to add a comment"}');
        // console.log(request.session);
    } else {
        let username = request.session.username
        const dateJS = new Date();
        const yyyy = dateJS.getFullYear();
        let mm = dateJS.getMonth() + 1; // Months start at 0!
        let dd = dateJS.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const date = dd + '/' + mm + '/' + yyyy;

        // console.log(date);

        db.insert_comment(username, user.reviews, date, user.movie_id, response)
    }
}

async function register_user(request, response) {
    let user_register = request.body
    

    let user_exists = await db.check_user(user_register.email)
    console.log("Data received by Server: " + JSON.stringify(user_register.email));

    db.register(user_exists, user_register.username, user_register.email, user_register.password, response)
}

async function insert_movie(request, response) {
    let movie = request.body
    let username = request.session.username
    console.log("insert-movie username:" + username);
    let movie_exists = await db.check_movie(movie.title)
    console.log("Data received by Server: " + movie);
    console.log("movie exists:" + movie_exists);

    //Check to see if a file has been submitted on this path
    if (!request.files || Object.keys(request.files).length === 0) {
        return response
            .status(400)
            .send('{"upload": false, "error": "No Picture"}');
    }

    // The name of the input field (i.e. "myFile") is used to retrieve the uploaded file
    let movie_poster = request.files.poster;
    console.log("movie poster:" + movie_poster);

    //CHECK THAT IT IS AN IMAGE FILE, NOT AN .EXE ETC.
    if (
        movie_poster.mimetype === "image/png" ||
        movie_poster.mimetype === "image/jpg" ||
        movie_poster.mimetype === "image/jpeg"
    ) {
        /* Use the mv() method to place the file in the folder called 'uploads' in the public folder.
          This is in the current directory */
        movie_poster.mv("./public/uploads/" + movie_poster.name, function (err) {
            if (err) {
                return response
                    .status(500)
                    .send(
                        '{"filename": "' +
                        movie_poster.name +
                        '", "upload": false, "error": "' +
                        JSON.stringify(err) +
                        '"}'
                    );
            } else {
                db.add_movie(
                    movie_exists,
                    movie.title,
                    movie.genre,
                    movie.duration,
                    movie.description,
                    movie.starring,
                    movie.yt_url,
                    movie.release_date,
                    movie.language,
                    movie.subtitle,
                    movie_poster.name,
                    username,
                    response
                );
            }
        });
    } else {
        response.send(
            '{"filename": "' +
            movie_poster.name +
            '", "upload": false, "error": "Upload image only"}'
        );
    }
}
function update_movie(request, response) {
    let movie = request.body
    console.log("Update Data received by Server: " + movie);

    //Check to see if a file has been submitted on this path
    if (!request.files || Object.keys(request.files).length === 0) {
        return response
            .status(400)
            .send('{"upload": false, "error": "No Picture"}');
    }

    // The name of the input field (i.e. "myFile") is used to retrieve the uploaded file
    let movie_poster = request.files.poster;
    console.log("movie poster:" + movie_poster);

    //CHECK THAT IT IS AN IMAGE FILE, NOT AN .EXE ETC.
    if (
        movie_poster.mimetype === "image/png" ||
        movie_poster.mimetype === "image/jpg" ||
        movie_poster.mimetype === "image/jpeg"
    ) {
        /* Use the mv() method to place the file in the folder called 'uploads' in the public folder.
          This is in the current directory */
        movie_poster.mv("./public/uploads/" + movie_poster.name, function (err) {
            if (err) {
                return response
                    .status(500)
                    .send(
                        '{"filename": "' +
                        movie_poster.name +
                        '", "upload": false, "error": "' +
                        JSON.stringify(err) +
                        '"}'
                    );
            } else {
                db.update_movie(
                    movie.title,
                    movie.genre,
                    movie.duration,
                    movie.description,
                    movie.starring,
                    movie.yt_url,
                    movie.release_date,
                    movie.language,
                    movie.subtitle,
                    movie_poster.name,
                    movie.movie_id,
                    response
                );
            }
        });
    } else {
        response.send(
            '{"filename": "' +
            movie_poster.name +
            '", "upload": false, "error": "Upload image only"}'
        );
    }
}


module.exports.app = app;