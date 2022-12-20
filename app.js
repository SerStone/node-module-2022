const express = require('express');
require('dotenv').config();

const userRouter = require('./router/user.router');
const flatRouter = require('./router/flat.router');
const configs = require('./config/config');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',userRouter);
app.use('/flats',flatRouter);

app.use((err, req, res, next)=>{
    res.status(err.status || 500).json({
        message:err.message || 'Unknown error',
        status:err.status || 500
    });
});

app.listen(configs.PORT,()=>{
    console.log(`Server is still working on ${configs.PORT} port`)
})
