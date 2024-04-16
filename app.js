const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const {getDiseaseInfo}= require('./api/api_disease.js');
const { fetchUserPrescriptions, bookAppointment } = require('./api/appoint.js');
require('./conf/passport')(passport);
const { ensureAuth, ensureGuest } = require('./middleware/auth')
const fs = require('fs');
const path = require('path');
const {getSkinInfo} = require('./api/api_skin_cancer.js');
const multer = require('multer');
var app = express();
const PORT = process.env.PORT || 3000;
// objects for multer file upload
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, './images');
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({storage:storage});
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

// here appointment booking
app.post('/api/book',async(req,res)=>{
  const opName= req.body.type;
  const email= req.body.email;
  if(opName=='fetch'){
    fetchUserPrescriptions(email).then((resp)=>{
      console.log(resp);
      res.send(JSON.stringify(resp))
    });
  }
  else{
    const query=req.body.msg;
    bookAppointment(email,query).then((resp)=>{
      console.log(resp);
      res.send(JSON.stringify(resp))
    });
  }
})
app.post('/api/upload', upload.single("image"), async (req, res)=>{
  const filename = res.req.file.filename;
  getSkinInfo(filename).then((res_)=>{
    console.log(res_)
    res.send(JSON.stringify(res_));
  })
})
app.get("/charak",ensureAuth, async(req,res)=>{
  res.render('index_charak',{userinfo:req.user})
})
app.get("/image",ensureAuth, async(req,res)=>{
  res.render('index_image',{userinfo:req.user})
})
app.get("/schedule",ensureAuth, async(req,res)=>{
  res.render('index_schedule',{userinfo:req.user})
})
app.listen(PORT,console.log(`listening at ${PORT}`))