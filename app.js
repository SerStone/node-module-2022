const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);

const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');
const configs = require('./config/config');
const { cronRunner } = require('./cron')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/auth',authRouter)
app.use('/users', userRouter);


app.get('/',(req, res) => {
    res.json('Welcome')
})

app.use((err, req, res, next)=>{
    res.status(err.status || 500).json({
        message:err.message || 'Unknown error',
        status:err.status || 500
    });
});

app.listen(configs.PORT,async ()=>{
   await mongoose.connect('mongodb://127.0.0.1/module2022');
    console.log(`Server is still working on ${configs.PORT} port`);
    cronRunner();
})
