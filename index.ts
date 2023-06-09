import express from 'express';
import bodyParser from "body-parser";
import router from "./src/router/router";
import mongoose from "mongoose";
const app = express();
app.set('views','./src/view');
app.set('view engine', 'ejs')
app.use(express.static('./public'))
import session from "express-session";
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 604800000 }}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router)
const url = 'mongodb://127.0.0.1:27017/demo_C12'
mongoose.set('strictQuery', true);
mongoose.connect(url).then(()=>{
    console.log('connect success')
}).catch((err)=>{
    console.log(err.message)
})


app.listen(3000, ()=>{
    console.log('server is running')
});