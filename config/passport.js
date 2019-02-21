const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();

const db = require('./db');

passport.serializeUser((user, done) => {
  done(null, user.authID);
  console.log('login!!');
});
passport.deserializeUser((id, done) => {
  var sql = 'SELECT * FROM users WHERE authID=?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
    }
    done(null, results[0]);
  });
});
passport.use(
  new LocalStrategy(
    {
      usernameField: 'userID',
      passwordField: 'userPW',
    },
    (username, password, done) => {
      var sql = 'SELECT * FROM users WHERE authID=?';
      db.query(sql, ['local:' + username], (err, results) => {
        if (err) {
          return done(err);
        }
        var user = results[0];
        return hasher(
          {
            password: password,
            salt: user.salt,
          },
          (err, pass, salt, hash) => {
            if (hash === user.userPW) {
              done(null, user);
            } else {
              done(null, false);
            }
          },
        );
      });
    },
  ),
);
module.exports = passport;
