var express = require('express');

var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register')

var app = express();

app.use('/users', usersRouter);
app.use('/members/new', registerRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));