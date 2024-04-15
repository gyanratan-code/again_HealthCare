const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const {getDiseaseInfo}= require('./api/api_disease.js');
require('./conf/passport')(passport);

// Mongo & Template Setup
var app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine','ejs');

app.use(
  session({
    secret: 'keyboard1',
    resave: false,
    saveUninitialized: true
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Middleware & DB for Sessions Setup
app.use(express.urlencoded({extended:true}))
mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo db connected")
        // connect to specified database
        const db = mongoose.connection.db;
    })
    .catch(err => console.log(err));

// Use Routes
app.use(require("./routes/index"))
app.use(require('./routes/auth'))
app.post('/api/charak',async (req, res)=>{
      const query = req.body.msg;
      getDiseaseInfo(query).then((res_)=>{
          console.log(res_);
          res.send(JSON.stringify(res_));
})
})
app.listen(PORT,console.log(`listening at ${PORT}`))