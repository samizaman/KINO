//Database code that we are testing
const db = require('../database');

const dotenv = require("dotenv");

//Server code that we are testing
let server = require('../server')

//Set up Chai library 
let chai = require('chai');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

//Set up Chai for testing web service
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

//Import the mysql module and create a connection pool with the user details
const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    debug: false
});

//Wrapper for all database tests
describe('Database', () => {

    //Mocha test for fetch_all_movies method in database module.
    describe('#fetch_all_comments', () => {
        it('should return all of the comments in the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of customers is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if (resObj.length > 1) {
                    resObj[0].should.have.property('movie_id');
                    resObj[0].should.have.property('title');
                    resObj[0].should.have.property('description');
                    resObj[0].should.have.property('genre');
                    resObj[0].should.have.property('duration');
                    resObj[0].should.have.property('starring');
                    resObj[0].should.have.property('release_date');
                    resObj[0].should.have.property('subtitle');
                    resObj[0].should.have.property('poster');
                    resObj[0].should.have.property('language');
                    resObj[0].should.have.property('yt_url');
                    resObj[0].should.have.property('username');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.fetch_all_comments("1", response);
        });
    });

    //Mocha test for fetch_all_movies method in database module.
    describe('#fetch_all_movies', () => {
        it('should return all of the movies in the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of customers is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if (resObj.length > 1) {
                    resObj[0].should.have.property('movie_id');
                    resObj[0].should.have.property('title');
                    resObj[0].should.have.property('description');
                    resObj[0].should.have.property('genre');
                    resObj[0].should.have.property('duration');
                    resObj[0].should.have.property('starring');
                    resObj[0].should.have.property('release_date');
                    resObj[0].should.have.property('subtitle');
                    resObj[0].should.have.property('poster');
                    resObj[0].should.have.property('language');
                    resObj[0].should.have.property('yt_url');
                    resObj[0].should.have.property('username');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.fetch_all_movies(response);
        });
    });

    //Mocha test for getAllCustomers method in database module.
    describe('#register', () => {
        it('should add a user to the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that customer has been added to database
                let sql = "SELECT username FROM users WHERE username='" + username + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err) { //Check for errors
                        assert.fail(err); //Fail test if this does not work.
                        done(); //End test
                    } else {
                        //Check that customer has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM users WHERE username='" + username + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err) { //Check for errors
                                assert.fail(err); //Fail test if this does not work.
                                done(); //End test
                            } else {
                                done(); //End test
                            }
                        });
                    }
                });
            };

            //Create random customer details
            let username = Math.random().toString(36).substring(2, 15);
            let email = username + "@gmail.com";
            let password = "123";

            //Call function to add customer to database
            db.register(false, username, email, password, response);
        });
    });


    //Mocha test for fetch_search_results method in database module.
    describe("#fetch_search_results", () => {
        it("should return all of the movies in the database that match the search word", (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
                     Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log(
                            "Error code: " + errorCode + "; Error message: " + errorMessage
                        );
                        assert.fail(
                            "Error code: " + errorCode + "; Error message: " + errorMessage
                        );
                        done();
                    },
                };
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of reviews is returned
                resObj.should.be.a("array");

                //Check that appropriate properties are returned
                if (resObj.length > 1) {
                    resObj[0].should.have.property('movie_id');
                    resObj[0].should.have.property('title');
                    resObj[0].should.have.property('description');
                    resObj[0].should.have.property('genre');
                    resObj[0].should.have.property('duration');
                    resObj[0].should.have.property('starring');
                    resObj[0].should.have.property('release_date');
                    resObj[0].should.have.property('subtitle');
                    resObj[0].should.have.property('poster');
                    resObj[0].should.have.property('language');
                    resObj[0].should.have.property('yt_url');
                    resObj[0].should.have.property('username');
                }

                //End of test
                done();
            };

            //Call function that we are testing
            db.fetch_search_results("Morbius", response);
        });
    });


});

//Wrapper for all web service tests
describe("Web Service", () => {
    //Test of GET request sent to /movies
    describe("/GET movies", () => {
        it("should GET all the reviews", (done) => {
            chai
                .request(server)
                .get("/movies")
                .end((err, response) => {
                    //Check the status code
                    response.should.have.status(200);

                    //Convert returned JSON to JavaScript object
                    let resObj = JSON.parse(response.text);

                    //Check that an array of reviews is returned
                    resObj.should.be.a("array");

                    //Check that appropriate properties are returned
                    if (resObj.length > 1) {
                        resObj[0].should.have.property('movie_id');
                        resObj[0].should.have.property('title');
                        resObj[0].should.have.property('description');
                        resObj[0].should.have.property('genre');
                        resObj[0].should.have.property('duration');
                        resObj[0].should.have.property('starring');
                        resObj[0].should.have.property('release_date');
                        resObj[0].should.have.property('subtitle');
                        resObj[0].should.have.property('poster');
                        resObj[0].should.have.property('language');
                        resObj[0].should.have.property('yt_url');
                        resObj[0].should.have.property('username');
                    }

                    //End test
                    done();
                });
        });
    });
});