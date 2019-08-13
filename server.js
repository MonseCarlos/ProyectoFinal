const express = require ('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const generalRoute = require ('./routes/Myinfo-routes')
const userRoutes = require('./routes/Users-routes')
const paqRoutes = require('./routes/paquetes-route')
const sesionesRoutes = require('./routes/sesion-routes')
const PORT = 9000
const dotenv = require('dotenv')
dotenv.config();

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-6xejz.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });
//mongoose.connect(`mongodb+srv://admin:NACI870129mon@cluster0-6xejz.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });
const connection = mongoose.connection; 
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})


function verifyToken(req, res, next) {
    //get Headers Value
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        //Split bearer header,   
        // we received the token like this: Authorization: Bearer <Token>
        const bearer = bearerHeader.split(' ')
        // get token
        const token = bearer[1];
        // set the token
        req.token = token;
        next();
    }else{
        // error "Forbidden message";
        res.status(403).json({
            success: false,
            message: 'Forbidden'
        });
    }
}


app.use('/Myinfo', verifyToken, generalRoute)
app.use('/users',userRoutes)
app.use('/paquetes',verifyToken ,paqRoutes)
app.use('/sesiones',verifyToken, sesionesRoutes)
/*
app.use('/login',verifyToken)
app.use('/mygalery',)
app.use('/mysesions',)
app.use('/finalproduct',)*/


app.listen(process.env.PORT, function () {
    console.log(`Server is running on Port: ${process.env.PORT}`);
})