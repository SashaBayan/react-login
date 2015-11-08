require('babel-core/register');

const express = require('express');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Your server is listening on localhost:${port}`));

app.use(passport.initialize());
app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
  res.render(__dirname + 'index.html');
});

