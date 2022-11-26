const express = require('express');
const {fileService} = require('./services');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/users', async (req, res) => {
    console.log('User Endpoint')
   const users = await fileService.reader();


    if (!users){
        return  res.status(404).json(`Users not found :(`);
    }
    res.json(users);
})

app.post('/users',async (req, res)=>{
    const userInfo = req.body;
    if ( userInfo.name.length < 2 || typeof userInfo.name !== "string"){
        return  res.status(400).json(`Wrong name :(`);
    }
    if ( userInfo.age < 0 || userInfo.age > 105 ){
        return  res.status(400).json(`Wrong nums :(`);
    }
    if ( userInfo.age < 0 || Number.isNaN(+userInfo.age)){
        return  res.status(400).json(`Wrong age :(`);
    }
    console.log(userInfo)
    const users = await fileService.reader();


    const newUser = { id: users[users.length-1].id+1,...userInfo};
    users.push(newUser);

    await fileService.writer(users);

    res.status(201).json(newUser);
})

app.get('/users/:userId', async (req, res)=>{
    console.log(req.params)
    const {userId} = req.params;

    const users = await fileService.reader();

    const user = users.find((u)=> u.id === +userId);

    if (!user){
       return  res.status(404).json(`User with id ${userId} not found :(`);
    }
    res.json(user);
})


app.put('/users/:userId',async (req, res) => {
    const newUserInfo = req.body;
    const {userId} = req.params

    const users = await fileService.reader();

    const index = users.findIndex((u)=> u.id === +userId);
    if (index === -1){
        return  res.status(404).json(`User with id ${userId} not found :(`);
    }
    users[index] = {...users[index], ...newUserInfo};


    await fileService.writer(users);
    res.status(201).json(users[index])
})

app.delete('/users/:userId',async (req, res) => {
    const {userId} = req.params;

    const users = await fileService.reader();

    const index = users.findIndex((u)=> u.id === +userId);
    if (index === -1){
        return  res.status(404).json(`User with id ${userId} not found :(`);
    }
    users.splice(index,1)


    await fileService.writer(users);
    res.sendStatus(204);
})

app.listen(5000,()=>{
    console.log("Server is still working on 5000 port")
})
