const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const logger = require('morgan');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('req-flash');
const cors = require('cors')

// Require Routes Folder
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors())
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));

 app.use(flash());
 
 
//DB Connection 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
.then(() => console.log('DataBase connection successful'))
.catch((err) => console.error(err))

app.use('/index', indexRouter);
app.use('/', usersRouter);


// Localhost
const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server is Running on PORT ${PORT} `));

