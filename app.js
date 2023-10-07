const express = require('express');

const app = express();

const morgan = require('morgan'); //npm login middle ware

const bodyParser = require('body-parser'); //formats post request fr easy readability

const mongoose = require('mongoose')  //Mongoose package

const userRoutes = require('./api/routes/user');



const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//connecting mongoose path
mongoose.connect('mongodb+srv://addition1:admin@cluster0.dgukx4r.mongodb.net/?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

//middle wares...
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//making use of CORS errors..
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow_Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE')
        return res.status(200).json({})
    }
    next();
})



app.use('/products', productRoutes);
app.use('/orders', orderRoutes );
app.use('/user', userRoutes );

//Handling error 
app.use((req, res, next)=>{
    const error =  new Error('Not Found');
    error.status = 404;
    next(error);
});

//Handling general error
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});



module.exports = app;