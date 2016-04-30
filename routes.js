var Schema = require('./js_backend/Schema');
var DbEditor = require('./js_backend/DbManipulator.js');

var bcrypt = require('bcrypt-nodejs');
var path = require('path');
global.root = path.resolve(__dirname);

var newUserId = 1000000000;
function init(){
  var q = 'SELECT MAX(' + Schema.User.column.id + ') as max ' +
          'FROM ' + Schema.User.table + ';';
  console.log(q);
  DbEditor.rawQuery(q, function(err, rows){
    if(!err && rows[0].max !== null){
      console.log(rows);
      newUserId = rows[0].max + 1;
      console.log('New user\'s id: ' + newUserId );
    }
  });
}
init();

function incrementUserId(){
  newUserId += 1;
  console.log('Update new user\'s id to -> ' + newUserId);
}

function toString(string){
  return '\'' + string +'\'';
}

module.exports = function(app, passport) {


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
                    var fname = user.firstName;
                    var lname = user.lastName;


                    //save user
                    var q = 'INSERT INTO ' + Schema.User.table + ' ' +
                            'VALUES (' + newUserId + ', \'' + user.username + '\', \'' + hash + '\''+ ', ' + toString(fname) + ', ' + toString(lname) + ')' ;
                    console.log('signup' + q);
                    DbEditor.rawQuery(q, function(err, rows){
                      if(!err){
                        res.redirect('/', { username : user.username });
                        incrementUserId();
                      }
                    });

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

    app.get('/angular_module/:name', function(req, res, next) {
        var moduleName = req.params.name;
        res.sendFile(root + '/angular_module/' + moduleName);

    });

    app.get('/css/:name', function(req, res, next) {
        var cssName = req.params.name;
        res.sendFile(root + '/css/' + cssName);
    });

    app.get('/js/:name', function(req, res, next){
        var jsName = req.params.name;
        res.sendFile(root + '/js/' + jsName);
    });

    app.get('/article', function(req, res, next) {
        res.render('test.ejs');
    });

    app.get('/images/:name' , function(req, res, next) {
        res.sendFile(root + '/images/' + req.params.name);
    });




};
