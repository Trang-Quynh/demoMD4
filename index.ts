import express from 'express';
import bodyParser from "body-parser";
import router from "./src/router/router";
const app = express();
app.set('views','./src/view');
app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router)
app.listen(3000, ()=>{
    console.log('server is running')
});