require('babel-core/register');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authenticate = require('./auth.js').authenticate;
const checkUserExists = require('./auth.js').checkUserExists;
const app = express();
const port = process.env.PORT || 3000;
const flash = require('connect-flash');
const session = require('express-session');


app.listen(port, () => console.log(`Your server is listening on localhost:${port}`));

passport.use(new LocalStrategy(
  (username, password, done) => {
    if (!checkUserExists(username)) {
      done(null, null, {message: 'That username is incorrect. Try again, breh?'});
    } else if (authenticate(username, password)) {
      done(null, {username: username});
    } else {
      done(null, null, {message: 'Definitely the wrong password, dude.'});
    }
  }
));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/', express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, msg) => {
    if (msg) return res.send({msg});
    res.send({loggedIn: true});
  })(req, res, next);
});
