const createError = require('http-errors');
const app = require('./config/express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// PORT
const port = process.env.PORT || 3001;

app.use(function(req, res, next) {
  console.log(req.user);
  if (!req.user)
    return next(createError(401, 'Please login to view this page.'));
  next();
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// SERVER LISTEN
app.listen(port, () => {
  console.log('SERVER ON PORT', port);
});
