
[![Build Status](https://travis-ci.org/Handroo/itp405-FinalProject.svg?branch=master)](https://travis-ci.org/Handroo/itp405-FinalProject)

#Starting App
To start the app just type this into the terminal:

`node app`

or type this into the terminal for continuous editing:

`nodemon app.js`

#Testing
I am using Mocha fo unit tests, so to type this into the terminal in the test directory:

`mocha test`

#Notes
###Api/Caching
I am using bing maps api to receive the coordinates of USC, then caching it so that it reused the USC location to check.
###UI
The UI is build through jquery and some bootstrap elements
###Database
There are three tables the app is interacting with: users, colors and animals. These tables are handled with Sequelize, which is a popular Node.js ORM

###Additional Resources
Link: 
https://stormy-depths-5129.herokuapp.com/
