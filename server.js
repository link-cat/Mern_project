const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');

const {checkUser} = require('./middleware/auth.middleware')
const {requireAuth} = require('./middleware/auth.middleware')

const app = express();

//parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

//jwt
app.get('*',checkUser)
app.get('/jwtid',requireAuth, (req, res)=>{
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


//server
app.listen(process.env.PORT,()=>{
    console.log(`app start on port ${process.env.PORT}`)
});
