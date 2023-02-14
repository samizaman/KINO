// let addUserResultDiv;
let user_validated = false;
let movie_validated = false;

// Set up page when window has loaded
window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init() {
    title_tag = document.getElementById("title")
    movie_div = document.getElementById("movie")
    nav_ul = document.getElementById("navbar")
    search_results_div = document.getElementById("search-results")
    // comments_div = document.getElementById("individual-comments")
    // post_comment_div = document.getElementById("post-comment")
    // individual_comments_div = document.getElementById("individual-comment")

    headline_div = document.getElementById("headline")
    my_profile_div = document.getElementsByClassName("my-profile")[0]
    movie_list_div = document.getElementsByClassName("movie-list")[0]
    register_div = document.getElementsByClassName("register")[0]
    login_div = document.getElementsByClassName("login")[0]
    view_movie_div = document.getElementsByClassName("view-movie")[0]
    add_movie_div = document.getElementsByClassName("add-movie")[0]
    update_movie_div = document.getElementsByClassName("update-movie")[0]

    display_movies();
    check_login();
}

function load_my_profile() {
    my_profile_div.style.display = "block"

    headline_div.style.display = "none"
    movie_list_div.style.display = "none"
    add_movie_div.style.display = "none"
    view_movie_div.style.display = "none"
    register_div.style.display = "none"
    login_div.style.display = "none"
    update_movie_div.style.display = "none"
    search_results_div.style.display = "none"
    

    display_my_profile_movies()

}

function load_update_movie() {
    update_movie_div.style.display = 'block'

    my_profile_div.style.display = "none"
    headline_div.style.display = "none"
    movie_list_div.style.display = "none"
    add_movie_div.style.display = "none"
    view_movie_div.style.display = "none"
    register_div.style.display = "none"
    login_div.style.display = "none"
    search_results_div.style.display = "none"
    

}

function load_home() {
    // document.getElementById("nav-home").style.color="blue";
    headline_div.style.display = "block"
    movie_list_div.style.display = "block"

    add_movie_div.style.display = "none"
    view_movie_div.style.display = "none"
    register_div.style.display = "none"
    login_div.style.display = "none"
    my_profile_div.style.display = "none"
    update_movie_div.style.display = "none"
    search_results_div.style.display = "none"

}

function load_register() {
    headline_div.style.display = "none"
    movie_list_div.style.display = "none"
    view_movie_div.style.display = "none"
    add_movie_div.style.display = "none"
    login_div.style.display = "none"
    my_profile_div.style.display = "none"
    update_movie_div.style.display = "none"
    search_results_div.style.display = "none"


    register_div.style.display = "block"
}

function load_login() {
    headline_div.style.display = "none"
    movie_list_div.style.display = "none"
    view_movie_div.style.display = "none"
    add_movie_div.style.display = "none"
    register_div.style.display = "none"
    my_profile_div.style.display = "none"
    update_movie_div.style.display = "none"
    search_results_div.style.display = "none"

    login_div.style.display = "block"
}

function load_view_movie(movie_id) {
    headline_div.style.display = "none"
    movie_list_div.style.display = "none"
    view_movie_div.style.display = "none"
    register_div.style.display = "none"
    login_div.style.display = "none"
    my_profile_div.style.display = "none"
    update_movie_div.style.display = "none"
    search_results_div.style.display = "none"



    view_movie_div.style.display = "block"

    display_selected_movie(movie_id)

}

function load_search_movie() {
    movie_list_div.style.display = "none"
    view_movie_div.style.display = "none"
    register_div.style.display = "none"
    login_div.style.display = "none"
    my_profile_div.style.display = "none"
    update_movie_div.style.display = "none"
    view_movie_div.style.display = "none"
    add_movie_div.style.display = "none"
    
    headline_div.style.display = "block"
    search_results_div.style.display = "block"

}

function load_add_movie() {
    headline_div.style.display = "none"
    movie_list_div.style.display = "none"
    view_movie_div.style.display = "none"
    register_div.style.display = "none"
    login_div.style.display = "none"
    my_profile_div.style.display = "none"
    update_movie_div.style.display = "none"
    search_results_div.style.display = "none"


    add_movie_div.style.display = "block"
}

function display_update_movies(movie_id) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // JSON to JS object
            let movie_array = JSON.parse(xhttp.responseText)
            load_update_movie()

            if (movie_array === 0) {
                console.log("empty");
                return;
            }

            let html_str = ""

            html_str += '<div class="add-headline mb-5 mt-2">';
            html_str += '<h2 class="text-center">Update Movie</h2>';
            html_str += '<hr class="dashed-general" style="margin-right: 53px;">';
            html_str += '</div>'
            html_str += '<div class="container bg-dark">'
            html_str += '<form class="row g-3 text-white">'
            html_str += '<div class="col-md-4">'
            html_str += '<label for="add-title" class="form-label">Title</label>'
            html_str += '<input type="text" class="form-control" id="update-title" value="' + movie_array[0].title + '">'
            html_str += '</div>'
            html_str += '<div class="col-md-4">'
            html_str += '<label for="add-genre" class="form-label">Genre</label>'
            html_str += '<input type="text" class="form-control" id="update-genre" value="' + movie_array[0].genre + '">'
            html_str += '</div>'
            html_str += '<div class="col-md-4">'
            html_str += '<label for="add-duration" class="form-label">Duration</label>'
            html_str += '<input type="number" class="form-control" id="update-duration" value="' + movie_array[0].duration + '">'
            html_str += '</div>'
            html_str += '<div class="col-12">'
            html_str += '<label for="add-description">Description</label>'
            html_str += '<textarea class="form-control" id="update-description"></textarea>'
            html_str += '</div>'
            html_str += '<div class="col-12">'
            html_str += '<label for="add-starring">Starring</label>'
            html_str += '<textarea class="form-control" id="update-starring" ></textarea>'
            html_str += '</div>'
            html_str += '<div class="col-md-6">'
            html_str += '<label for="add-url" class="form-label">YouTube URL</label>'
            html_str += '<input type="text" class="form-control" id="update-url" placeholder="https://www.youtube.com/embed/" value="' + movie_array[0].yt_url + '">'
            html_str += '</div>'
            html_str += '<div class="col-md-2">'
            html_str += '<label for="add-release-date" class="form-label">Release Date</label>'
            html_str += '<input type="text" class="form-control" id="update-release-date" placeholder="MM.DD.YYYY" value="' + movie_array[0].release_date + '">'
            html_str += '</div>'
            html_str += '<div class="col-md-2">'
            html_str += '<label for="add-language" class="form-label">Language</label>'
            html_str += '<input type="text" class="form-control" id="update-language" value="' + movie_array[0].language + '">'
            html_str += '</div>'
            html_str += '<div class="col-md-2">'
            html_str += '<label for="add-subtitle" class="form-label">Subtitle(s)</label>'
            html_str += '<input type="text" class="form-control" id="update-subtitle" value="' + movie_array[0].subtitle + '">'
            html_str += '</div>'
            html_str += '<label>Poster</label>'
            html_str += '<div class="input-group mb-3">'
            html_str += '<input type="file" class="form-control" id="update-poster" value="' + movie_array[0].poster + '">'
            html_str += '<label class="input-group-text" for="add-poster">Upload</label>'
            html_str += '</div>'
            html_str += '<div class="col-12">'
            html_str += '<button type="submit" id="submit" class="btn btn-primary" onclick="update_movie(' + movie_array[0].movie_id + ', event)">Update</button>'
            html_str += '</div>'
            html_str += '</form>'
            html_str += '</div>'


            update_movie_div.innerHTML = html_str
            document.getElementById("update-description").innerText = movie_array[0].description
            document.getElementById("update-starring").innerText = movie_array[0].starring
        }
    }
    xhttp.open("GET", "/update-movie/" + movie_id, true)
    xhttp.send();
}

function display_movies() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/movies", true)
    xhttp.send();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // JSON to JS object
            let movie_array = JSON.parse(xhttp.responseText)

            if (movie_array === 0) {
                console.log("empty");
                return;
            }

            let html_str = ""

            for (let key in movie_array) {
                html_str += '<div class="col ">';
                html_str += '<div class="card h-100 text-white bg-dark" style="width: 15rem;">';
                html_str += '<img src="./uploads/' + movie_array[key].poster + '" class=" card-img-top" alt="' + movie_array[key].poster + '"/>';
                html_str += '<div class="card-body">';
                html_str += '<h5 class="card-title">' + movie_array[key].title + '</h5>';
                html_str += '<p class="card-text">Language: ' + movie_array[key].language + '</p>';
                html_str += '<a class="btn btn-danger" onclick="load_view_movie(' + movie_array[key].movie_id + ')">Reviews</a>'; //
                html_str += '</div>';
                html_str += '</div>';
                html_str += '</div>';
            }
            movie_div.innerHTML = html_str
        }
    }
}

function display_search_results(event) {
    //Set up XMLHttpRequest
    let search_input = document.getElementById("search").value
    let xhttp = new XMLHttpRequest();

    if (search_input === "") {
        alert("🚩 Please enter what you want to search for.")
        event.preventDefault();
    } else {
        xhttp.onload = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // JSON to JS object
                let movie_array = JSON.parse(xhttp.responseText)

                if (movie_array.length === 0) {
                    alert("🚩 found nothing")
                    return;
                }

                let html_str = ""

                for (let key in movie_array) {
                    html_str += '<div class="col ">';
                    html_str += '<div class="card h-100 text-white bg-dark" style="width: 15rem;">';
                    html_str += '<img src="./uploads/' + movie_array[key].poster + '" class=" card-img-top" alt="' + movie_array[key].poster + '"/>';
                    html_str += '<div class="card-body">';
                    html_str += '<h5 class="card-title">' + movie_array[key].title + '</h5>';
                    html_str += '<p class="card-text">Language: ' + movie_array[key].language + '</p>';
                    html_str += '<a class="btn btn-danger" onclick="load_view_movie(' + movie_array[key].movie_id + ')">Reviews</a>'; //
                    html_str += '</div>';
                    html_str += '</div>';
                    html_str += '</div>';
                }
                search_results_div.innerHTML = html_str
                load_search_movie()
            }
        }

        xhttp.open("GET", "/search/" + search_input, true)
        xhttp.send();
        event.preventDefault();
    }
}

function display_my_profile_movies() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // JSON to JS object
            let movie_array = JSON.parse(xhttp.responseText)

            if (movie_array === 0) {
                console.log("empty");
                return;
            }

            let html_str = ""

            html_str += '<div class="container mt-4">';
            html_str += '<div class="card text-white bg-dark  mx-auto">';
            html_str += '<div class="card-header">';
            html_str += '<h4>Hello ' + movie_array[0].username + '</h4>';
            html_str += '</div>';
            html_str += '<div class="card-body text-center">';
            html_str += '<div class="row row-cols-1 row-cols-md-4 g-5 ">';
            for (let key in movie_array) {

                html_str += '<div class="col">';
                html_str += '<div class="card h-100 text-white bg-dark" style="width: 15rem;">';
                html_str += '<img src="./uploads/' + movie_array[key].poster + '" class=" card-img-top" alt="' + movie_array[key].poster + '"/>';
                html_str += '<div class="card-body">';
                html_str += '<button type="submit" class="btn btn-warning" onclick="display_update_movies(' + movie_array[key].movie_id + ')">Update</button>';
                html_str += '<a class="btn btn-danger" onclick="delete_movie(' + movie_array[key].movie_id + ')">Delete</a>';
                html_str += '</div>';
                html_str += '</div>';
                html_str += '</div>';
            }
            html_str += '</div>';
            html_str += '</div>';
            html_str += '</div>';
            html_str += '</div>';
            html_str += '<div id="update">';
            html_str += '</div>';


            my_profile_div.innerHTML = html_str
        }
    }
    xhttp.open("GET", "/movies-profile", true)
    xhttp.send();
}

function display_selected_movie(movie_id) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // JSON to JS object
            let movie_array = JSON.parse(xhttp.responseText)

            if (movie_array === 0) {
                console.log("empty");
                return;
            }

            let html_str = ""

            html_str += '<div class="container mx-5 mt-5">';
            html_str += '<h1 class="view-page-title mb-5">' + movie_array[0].title + '</h1>';
            html_str += '<div class="row row-cols-3">';
            html_str += '<div class="col">';
            html_str += '<img src="./uploads/' + movie_array[0].poster + '" class=" card-img-top" alt="' + movie_array[0].poster + '" style="width: 18.8rem;"/>';
            html_str += '</div>';

            html_str += '<div class="col">';
            html_str += '<iframe width="620" height="428" src="' + movie_array[0].yt_url + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            html_str += '</div>';

            html_str += '</div>';
            html_str += '<hr class="dashed-general" style="margin-right: 234px;">';
            html_str += '</div>';

            html_str += '<div class="container mx-5">';
            html_str += '<div class="row row-cols-4">';
            html_str += '<div class="col">';
            html_str += '<p><b>Genre: </b>' + movie_array[0].genre + '</p>';
            html_str += '<p><b>Release Date: </b>' + movie_array[0].release_date + '</p>';
            html_str += '<p><b>Starring: </b> ' + movie_array[0].starring + '</p>';
            html_str += '<p><b>Duration: </b> ' + movie_array[0].duration + '</p>';
            html_str += '<p><b>Subtitle(s): </b> ' + movie_array[0].subtitle + '</p>';
            html_str += '</div>';

            html_str += '<div class="col col-sm-7">';
            html_str += '<p class="description">' + movie_array[0].description + '</p>';
            html_str += '</div>';
            html_str += '</div>';
            html_str += '<hr class="dashed-general" style="margin-right: 234px;">';
            html_str += '</div>';
            html_str += '</div>';

            html_str += '<div class="container mx-5" >';
            html_str += '<h1 class="view-page-title">Your Thoughts on This Movie</h1>';
            html_str += '<textarea class="form-control" id="movie-review" name="movie-review" style="width: 67rem;" rows="3" placeholder="Reviews"></textarea>';
            html_str += '<a class="btn btn-danger mt-3" onclick="add_reviews(' + movie_array[0].movie_id + ')">Post</a>';
            html_str += '</div>';

            html_str += '<div id="comments-pls">';
            html_str += '</div>';


            html_str += '</div>';
            view_movie_div.innerHTML = html_str
        }
    }
    xhttp.open("GET", "/movies/" + movie_id, true)
    xhttp.send();
    display_comments(movie_id)

}

function login() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data from index.html form
    let username = document.getElementById("login-username").value;
    // let user_email = document.getElementById("login-username").value;
    let user_password = document.getElementById("login-password").value;

    //Create object with user data
    let user = {
        username: username,
        password: user_password
    };

    if (user.username === "" || user.password === "") {
        alert("Please enter your details.")
    } else {
        xhttp.onload = function () {
            //Set up function that is called when reply is recieved from server
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Checking if the response is not false
                if (xhttp.response !== '{"found": "false"}') {
                    // Taking them to home page if user is found
                    alert("Logged in successfully 🥳")
                    location.href = "/";
                } else {
                    alert("🚩 Please try again.")
                }
            } else {
                alert("🚩 Database error!")
            }
        }
        xhttp.open("POST", "/login-user", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        // Sending user in JSON format
        xhttp.send(JSON.stringify(user));
    }
}

function check_login() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        let html_str = ""
        if (this.response === '{"login": false}') {
            html_str += '<li><a onclick="load_home()">Home</a></li>';
            html_str += '<li><a onclick="load_register()">Register</a></li>';
            html_str += '<li><a onclick="load_login()">Login</a></li>';

            nav_ul.innerHTML = html_str
        } else {
            // let user = JSON.parse(this.responseText)
            html_str += '<li><a onclick="load_home()">Home</a></li>';
            html_str += '<li><a onclick="load_add_movie()">Add Movie</a></li>';
            html_str += '<li><a onclick="load_my_profile()">My Profile</a></li>';
            html_str += '<li><a onclick="logout()">Logout</a></li>';

            nav_ul.innerHTML = html_str
        }
    }
    xhttp.open("GET", "/check-login", true)
    xhttp.send()
}

function logout() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //Set up function that is called when reply is recieved from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Checking if the response is not false
            if (xhttp.response === '{"login": "false"}') {
                alert("Logged out")
                check_login()
                headline_div.style.display = "block"
                movie_list_div.style.display = "block"
                view_movie_div.style.display = "none"
                register_div.style.display = "none"
                login_div.style.display = "none"
                add_movie_div.style.display = "none"

            } else {
                console.log("🚩 Server response error");
            }
        } else {
            console.log("🚩 XHTTP error");
        }
    }
    xhttp.open("GET", "/logout", true);
    xhttp.send();
}

function display_comments(movie_id) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // JSON to JS object
            let comment_array = JSON.parse(xhttp.responseText)
            // alert(comments_div)

            let html_str = ""


            if (comment_array.length === 0) {
                document.getElementById("comments-pls").innerHTML = '<h3 class="text-muted mt-5 resize-review">No one has left a review yet.</h3>';
                // alert(comments_div.value)
                return
            }

            for (let key in comment_array) {
                html_str += '<div class="card text-white bg-dark resize-comments mt-4 reposition-comment">';
                html_str += '<div class="card-header">';
                html_str += '<p class="inline">@' + comment_array[key].username + '</p>';
                html_str += '<p class="resize-date inline">' + comment_array[key].date + '</p>';
                html_str += '</div>';
                html_str += '<div class="card-body">';
                html_str += '<p>' + comment_array[key].reviews + '</p>';
                html_str += '</div>';
                html_str += '</div>';
            }
            document.getElementById("comments-pls").innerHTML = html_str
        }
    }
    xhttp.open("GET", "/comments/" + movie_id, true)
    xhttp.send();
}

function add_reviews(movie_id) {

    let xhttp = new XMLHttpRequest()
    let reviews = document.getElementById("movie-review").value;
    // alert("review msg in client:" + JSON.stringify(reviews))
    const formData = new FormData();

    // let user = {
    //     review: review,
    //     movie_id: movie_id,
    // };

    if (reviews === "") {
        alert("🚩 Please add a comment.")
    } else {
        formData.append("reviews", reviews)
        formData.append("movie_id", movie_id)


        xhttp.onload = () => {
            //Set up function that is called when reply is recieved from server
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                if (xhttp.responseText === '{"result": "Review added successfully"}') {
                    alert("Review added successfully 🥳")
                    load_view_movie(movie_id)
                } else if (xhttp.responseText === '{"result": "Please login to add a comment"}') {
                    alert("🚩 Please login to add a comment.")
                }
            } else {
                alert("🚩 Server error!")
                load_home()
            }
        }
        xhttp.open("POST", "/add-review", true)
        xhttp.send(formData)
    }
}


function delete_movie(movie_id) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest()
    movie = {
        movie_id: movie_id
    }
    xhttp.onload = function () {


        //Set up function that is called when reply is recieved from server
        if (xhttp.responseText === '{"result": "Movie deleted successfully"}') {
            alert("Movie deleted successfully ✅")
            load_my_profile()
        } else {
            alert("🚩 Error deleting the movie. Please try again later")
        }
    }
    xhttp.open("POST", "/delete-movie", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(movie));

}


function register(event) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/register-user", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    //Extract user data from index.html form
    let username = document.getElementById("register-username").value;
    let user_email = document.getElementById("register-email").value;
    let user_password = document.getElementById("register-password").value;
    let user_confirm_password = document.getElementById("register-confirm-password").value;
    // let error_alert = document.getElementById("error");
    // let success_alert = document.getElementById("success");


    //Create object with user data
    let user = {
        username: username,
        email: user_email,
        password: user_password
    };

    // Checking empty fields
    if (user.username === "" || user.email === "" || user.password === "" || user_confirm_password === "") {
        alert("🚩 Please enter all the details.")
        event.preventDefault();
    } else {
        if (email_validated(user.email)) {
            // alert("Setting user true")
            user_validated = true
        } else {
            alert("Invalid email address.")
            event.preventDefault();
        }
        event.preventDefault();
    }

    xhttp.onload = function () {
        // alert("Post request gone")
        if (xhttp.response === "{result: 'Customer added successfully'}") {
            alert("Registered successfully ✅")
            load_login()
        } else if (xhttp.response === "{result: 'User already exists'}") {
            alert("🚩 Account already exists!")
        } else {
            alert("🚩 Registeration failed. Please try again.")
        }
    }

    if (user_validated === true) {
        xhttp.send(JSON.stringify(user));
        event.preventDefault()
    }

    user_validated = false

}

function update_movie(movie_id, event) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    // alert("client ekse")


    //Extract user data from index.html form
    let movie_title = document.getElementById("update-title").value;
    let movie_genre = document.getElementById("update-genre").value;
    let movie_duration = document.getElementById("update-duration").value;
    let movie_description = document.getElementById("update-description").value;
    let movie_starring = document.getElementById("update-starring").value;
    let movie_url = document.getElementById("update-url").value;
    let movie_release_date = document.getElementById("update-release-date").value;
    let movie_language = document.getElementById("update-language").value;
    let movie_subtitle = document.getElementById("update-subtitle").value;
    let movie_poster = document.getElementById("update-poster").files;

    const formData = new FormData();

    // Checking empty fields
    if (movie_title === "" ||
        movie_genre === "" ||
        movie_duration === "" ||
        movie_description === "" ||
        movie_starring === "" ||
        movie_url === "" ||
        movie_release_date === "" ||
        movie_language === "" ||
        movie_subtitle === "" ||
        movie_poster.length !== 1
    ) {
        alert("Please enter all the details.")
        event.preventDefault()

    } else {
        formData.append("movie_id", movie_id)
        formData.append("title", movie_title)
        formData.append("genre", movie_genre)
        formData.append("duration", movie_duration)
        formData.append("description", movie_description)
        formData.append("starring", movie_starring)
        formData.append("yt_url", movie_url)
        formData.append("release_date", movie_release_date)
        formData.append("language", movie_language)
        formData.append("subtitle", movie_subtitle)
        formData.append("poster", movie_poster[0])

        xhttp.onload = () => {
            // alert("Post request gone")
            if (xhttp.response === "{'result': 'Movie updated successfully'}") {
                alert("Movie updated successfully ✅")
                load_my_profile()
                event.preventDefault();
            } else {
                alert("🚩 Movie could not be updated. Please try again.")
            }
        }

        xhttp.open("POST", "/update-movie", true);

        xhttp.send(formData);
        event.preventDefault();

        // for (var value of formData.values()) {
        //     console.log(value);
        // }
    }
}

async function add_movie(event) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data from index.html form
    let movie_title = document.getElementById("add-title").value;
    let movie_genre = document.getElementById("add-genre").value;
    let movie_duration = document.getElementById("add-duration").value;
    let movie_description = document.getElementById("add-description").value;
    let movie_starring = document.getElementById("add-starring").value;
    let movie_url = document.getElementById("add-url").value;
    let movie_release_date = document.getElementById("add-release-date").value;
    let movie_language = document.getElementById("add-language").value;
    let movie_subtitle = document.getElementById("add-subtitle").value;
    let movie_poster = document.getElementById("add-poster").files;

    const formData = new FormData();

    // Checking empty fields
    if (movie_title === "" ||
        movie_genre === "" ||
        movie_duration === "" ||
        movie_description === "" ||
        movie_starring === "" ||
        movie_url === "" ||
        movie_release_date === "" ||
        movie_language === "" ||
        movie_subtitle === "" ||
        movie_poster.length !== 1
    ) {
        alert("Please enter all the details.")
        event.preventDefault();
    } else {
        // alert("Setting user true")
        movie_validated = true
        formData.append("title", movie_title)
        formData.append("genre", movie_genre)
        formData.append("duration", movie_duration)
        formData.append("description", movie_description)
        formData.append("starring", movie_starring)
        formData.append("yt_url", movie_url)
        formData.append("release_date", movie_release_date)
        formData.append("language", movie_language)
        formData.append("subtitle", movie_subtitle)
        formData.append("poster", movie_poster[0])

        xhttp.onload = () => {
            // alert("Post request gone")
            if (xhttp.response === "{result: 'Movie added successfully'}") {
                alert("Movie added successfully ✅")
                event.preventDefault();
                location.href = "/";
            } else if (xhttp.response === "{result: 'Movie already exists'}") {
                alert("🚩 Movie already exists!")
            } else {
                alert("🚩 Movie could not be added. Please try again.")
            }
        }

        if (movie_validated) {
            xhttp.open("POST", "/add-movie", true);
            xhttp.send(formData);
            event.preventDefault();
        }

        // for (var value of formData.values()) {
        //     console.log(value);
        // }
    }

    movie_validated = false
}

function confirm_password_validated() {
    password_error_msg = document.getElementById('password-error-msg');
    password_input = document.getElementById('register-password');
    confirm_password_input = document.getElementById('register-confirm-password');

    if (password_input.value == confirm_password_input.value) {
        password_input.setAttribute('style', 'border: 1px solid #198754 !important; box-shadow: 0 0 2px #198754 !important;');
        confirm_password_input.setAttribute('style', 'border: 1px solid #198754 !important; box-shadow: 0 0 2px #198754 !important;');

        document.getElementById('submit').disabled = false;
        password_error_msg.innerHTML = ""
    } else {
        password_input.setAttribute('style', 'border: 1px solid #dc3545 !important; box-shadow: 0 0 2px #dc3545 !important;');
        confirm_password_input.setAttribute('style', 'border: 1px solid #dc3545 !important; box-shadow: 0 0 2px #dc3545 !important;');
        document.getElementById('submit').disabled = true;
        password_error_msg.innerHTML = "Please enter the password again."
    }
}

const email_validated = () => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let user_email = document.getElementById("register-email").value;
    if (user_email.match(validRegex)) {
        return true;

    } else {
        return false;
    }
}