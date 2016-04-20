var Schema = require('./js_backend/Schema');
var DbEditor = require('./js_backend/DbManipulator.js');
var ApiCalls = require('./js_backend/ApiCalls');

var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, passport) {

    //GET index
    app.get('/', function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/signin');
        } else {
            var user = req.user;
            res.render('test.ejs');

        }
    });

    //GET signin page
    app.get('/signin', function(req, res, next) {
        if (req.isAuthenticated()) res.redirect('/');
        res.render('signin.ejs');
    });

    //GET signup page
    app.get('/signup', function(req, res, next) {
        res.render('signup.ejs');

    });

    //POST signup
    app.post('/signup', function(req, res, next) {
        var user = req.body;

        DbEditor.query(Schema.User.table, [Schema.User.column.username], [Schema.User.column.username + '='], ['\''+user.username+'\''], function(err, rows) {
            console.log(err);
            if (!err) {

                if (rows.length === 0) { // no match username
                    // VALIDATION

                    var password = user.password;
                    var hash = bcrypt.hashSync(password);

                    //save user
                    var q = 'INSERT INTO ' + Schema.User.table + ' (' + Schema.User.column.username + ', ' + Schema.User.column.password + ') ' +
                            'VALUES (\'' + user.username + '\', \'' + hash + '\')';

                } else { //when there is a match username
                  //render invalid username.
                }

            } else { //when error occur during query
              //render please retry?
            }
        });

    });

    //POST signin
    app.post('/signin', function(req, res, next) {
        passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/signin'
            },
            function(err, user, info) {
                if (err) {
                    return; //render web with error message
                }

                if (!user) {
                    return; //render web with info message
                }

                req.logIn(user, function(err) {
                    if (err) {
                        return; //render web with error message
                    } else {
                        return res.redirect('/');
                    }
                });
            })(req, res, next);
    });

    app.get('/signout', function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/signin');
        } else {
            req.logout();
            res.redirect('/signin');
        }
    });




};
