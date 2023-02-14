const mysql = require("mysql");
const dotenv = require("dotenv");
const {
    use
} = require("express/lib/application");
const {
    json
} = require("express/lib/response");

// giving it the path to the .env file 
dotenv.config({
    path: "./config.env"
});

const db = mysql.createConnection({
    connectionLimit: 1,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    debug: false
});

exports.fetch_all_movies = (response) => {
    let sql = "SELECT * FROM movies"

    db.query(sql, (error, result) => {
        if (error) {
            let error_msg = "{Error: " + error + "}";
            console.error(error_msg);
            response.status(400), json(error_msg);
        } else {
            response.send(JSON.stringify(result))
        }
    })
}

exports.fetch_all_update_movies = (movie_id, response) => {
    let sql = `SELECT * FROM movies WHERE movie_id='${movie_id}'`;

    db.query(sql, (error, result) => {
        if (error) {
            let error_msg = "{Error: " + error + "}";
            console.error(error_msg);
            response.status(400), json(error_msg);
        } else {
            response.send(JSON.stringify(result))
        }
    })
}

exports.fetch_all_movies_profile = (username, response) => {
    let sql = "SELECT users.username, movies.poster, movies.movie_id FROM movies INNER JOIN users ON users.username = movies.username and users.username = " + "'" + username + "'";

    db.query(sql, (error, result) => {
        if (error) {
            let error_msg = "{Error: " + error + "}";
            console.error(error_msg);
            response.status(400), json(error_msg);
        } else {
            response.send(JSON.stringify(result))
        }
    })
}

exports.fetch_all_comments = (movie_id, response) => {
    let sql = `SELECT * FROM reviews WHERE movie_id='${movie_id}'`;

    db.query(sql, (error, result) => {
        if (error) {
            let error_msg = "{Error: " + error + "}";
            console.error(error_msg);
            response.status(400), json(error_msg);
        } else {
            response.send(JSON.stringify(result))
        }
    })
}

exports.delete_movie = (movie_id, response) => {
    let sql = `DELETE FROM movies WHERE movie_id='${movie_id}'`;

    db.query(sql, (error, result) => {
        if (error) {
            let error_msg = "{Error: " + error + "}";
            console.error(error_msg);
            response.status(400), json(error_msg);
        } else {
            response.send('{"result": "Movie deleted successfully"}')
        }
    })
}

exports.fetch_selected_movie = (movie_id, response) => {
    console.log("Data received by Database: " + JSON.stringify(movie_id));
    let sql = `SELECT * FROM movies WHERE movie_id='${movie_id}'`;

    db.query(sql, (error, result) => {
        if (error) {
            let error_msg = "{Error: " + error + "}";
            console.error(error_msg);
            response.status(400), json(error_msg);

        } else {
            response.send(JSON.stringify(result))
            console.log(result);
        }
    })
}

exports.fetch_search_results = (search_word, response) => {
    console.log("Data received by Database: " + JSON.stringify(search_word));

    let sql = "SELECT * FROM movies where title LIKE '%" + search_word + "%'";

    db.query(sql, (error, result) => {
        if (error) {
            let error_msg = "{Error: " + error + "}";
            console.error(error_msg);
            response.status(400), json(error_msg);

        } else {
            response.send(JSON.stringify(result))
            console.log(result);
        }
    })
}

//Adding customer to database
exports.register = (user_exists, username, email, password, response) => {
    if (!user_exists) {
        // SQL Query
        let sql = `INSERT INTO users (username,email,password) VALUES('${username}','${email.toLowerCase()}','${password}');`


        db.query(sql, (error, result) => {
            if (error) {
                let error_msg = "{Error: " + error + "}";
                console.error(error_msg);
                response.status(400), json(error_msg);
            } else {
                //Send back result
                response.send("{result: 'Customer added successfully'}")
            }
        })
    } else {
        response.send("{result: 'User already exists'}")
    }
}


exports.insert_comment = (username, review, date, movie_id, response) => {
    // SQL Query
    let sql = `INSERT INTO reviews (username,reviews,date,movie_id) VALUES('${username}','${review}','${date}','${movie_id}');`

    db.query(sql, (error, result) => {
        if (error) {
            let error_msg = "{Error: " + error + "}";
            console.log("you have reached if in db");
            console.error(error_msg);
            response.status(400), json(error_msg);
        } else {
            //Send back result
            response.send('{"result": "Review added successfully"}')
        }
    })
}


exports.add_movie = (movie_exists, title, genre, duration, description, starring, yt_url, release_date, language, subtitle, poster, username, response) => {
    console.log("Add Movie: Data received by Database: " + duration);
    if (!movie_exists) {
        // SQL Query
        let sql = `INSERT INTO movies (title,genre,duration,description,starring,yt_url,release_date,language,subtitle,poster, username) VALUES('${title}','${genre}','${duration}','${description}', '${starring}', '${yt_url}', '${release_date}', '${language}', '${subtitle}', '${poster}', '${username}');`

        db.query(sql, (error, result) => {
            if (error) {
                let error_msg = "{Error: " + error + "}";
                console.error(error_msg);
                response.status(400), json(error_msg);
            } else {
                //Send back result
                response.send("{result: 'Movie added successfully'}")
            }
        })
    } else {
        response.send("{result: 'Movie already exists'}")
    }
}

exports.update_movie = (title, genre, duration, description, starring, yt_url, release_date, language, subtitle, poster, movie_id, response) => {
        // SQL Query
        let sql = "UPDATE movies SET title = '" + title + "', description = '" + description + "', genre = '" + genre + "', duration = '" + duration + "', starring = '" + starring + "', yt_url = '" + yt_url + "' ,release_date = '" + release_date + "', subtitle = '" + subtitle + "', poster = '" + poster + "' ,language = '"+ language +"' WHERE movie_id = " + movie_id;

        db.query(sql, (error, result) => {
            if (error) {
                let error_msg = "{Error: " + error + "}";
                console.error(error_msg);
                response.status(400), json(error_msg);
            } else {
                //Send back result
                response.send("{'result': 'Movie updated successfully'}")
            }
        })
    }

async function fetch_user(username, password) {
    // let sql = "SELECT * FROM users where email = '" + email + "' && password = '" + password + "'"
    let sql = `SELECT * FROM users where username='${username}' and password='${password}'`;
    let user = [];

    let selectPromise = new Promise((resolve, reject) => {
        // result gets the entire user information in it
        db.query(sql, (error, result) => {
            if (error) {
                reject("Error executing query: " + JSON.stringify(error))
            } else {
                resolve(result)
            }
        });
    });

    //If your account already exists, you get appended to the array
    try {
        user = await selectPromise;
    } catch (error) {
        console.error(JSON.stringify(error));
    }
    return user
}

async function check_user(email) {
    console.log("Data received by Database: " + JSON.stringify(email));
    let sql = `SELECT * FROM users WHERE email='${email.toLowerCase()}'`;

    let user = []

    let selectPromise = new Promise((resolve, reject) => {
        db.query(sql, (error, result) => {
            if (error) {
                reject("Error executing query: " + JSON.stringify(error))
            } else {
                resolve(result)
            }
        })
    })

    try {
        user = await selectPromise
    } catch (error) {
        console.error(JSON.stringify(error))
    }

    //Checks the length of array - if its 0 then user does not exist 
    if (user.length === 0) {
        return false
    } else {
        return true
    }
}

async function check_movie(title) {
    let sql = `SELECT * FROM movies WHERE title='${title}'`;
    console.log("Check Movie: Data received by Database: " + JSON.stringify(title));


    let movie = []

    let selectPromise = new Promise((resolve, reject) => {
        db.query(sql, (error, result) => {
            if (error) {
                reject("Error executing query: " + JSON.stringify(error))
            } else {
                resolve(result)
            }
        })
    })

    try {
        movie = await selectPromise
    } catch (error) {
        console.error(JSON.stringify(error))
    }

    //Checks the length of array - if its 0 then movie does not exist 
    if (movie.length === 0) {
        return false
    } else {
        return true
    }
}

module.exports.fetch_user = fetch_user;
module.exports.check_user = check_user;
module.exports.check_movie = check_movie;
// module.exports = db;