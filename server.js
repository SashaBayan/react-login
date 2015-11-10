require('babel-core/register');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authenticate = require('./auth.js');
const app = express();
const port = process.env.PORT || 3000;
const flash = require('connect-flash');
const session = require('express-session');


app.listen(port, () => console.log(`Your server is listening on localhost:${port}`));

passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('hi there', {username, password});
    if (authenticate(username, password)) {
      done(null, {username: username});
    } else {
      done(null, null, {message: 'UNSUCCESSFUL LOGIN'});
    }
  }
));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/', express.static(__dirname));
// app.use(flash());
// app.use(session({secret: 'yolo'}));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, msg) => {
    if (msg) return res.send({msg});
    res.send({loggedIn: true});
  })(req, res, next);
});

// app.post('/login', (req, res) => {

//   console.log(req);
//   // req.body
//   res.send({meh: 'what', body:req.body});
// });
