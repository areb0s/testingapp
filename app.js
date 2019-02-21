const createError = require('http-errors');
const app = require('./config/express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// PORT
const port = process.env.PORT || 3001;

app.use(function(req, res, next) {
  console.log(req.user);
  if (!req.user)
    return next(createError(401, 'Please login to view this page.'));
  next();
});

// SERVER LISTEN
app.listen(port, () => {
  console.log('SERVER ON PORT', port);
});
