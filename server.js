const mongoDB = require("./config/mongoDB");
const express = require('express');
const connectDB = require("./config/mysqlDB");
const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = require('./controllers/userControllers');
const multer = require("multer");
const { getAllCars, getCarById, addCar, deleteCarByID, updateCar } = require("./controllers/carControllers");
require('dotenv').config()



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(express.json());

// app.use(middle1);
// app.use(middle2);

mongoDB();
let connection;

app.listen(5000, async()=>{ 
    connection = await connectDB();
    console.log("Application Server is running on port 5000")
});

app.get('/', function(req, res){
    res.send("Welcome to first node with express");
})

// ******************* Car Api Function *************************** 

app.get('/api/cars/getAll', async function(req, res){
    const data = await getAllCars(connection);
    res.send(data);
})

app.get('/api/cars/get/:id', async function(req, res){
    const data = await getCarById(connection, req.params.id);
    res.send(data);
})

app.post('/api/cars/add', async function(req, res){
    const data = await addCar(connection, req.body);
    res.send(data);
})

app.delete('/api/cars/delete/:id', async function(req, res){
    const data = await deleteCarByID(connection, req.params.id);
    res.send(data);
})

app.put('/api/cars/update/:id', async function(req, res){
    // console.log(req.params.id, req.body);
    const data = await updateCar(connection, req.params.id, req.body);
    res.send(data);
});


// ******************* User Api Function *************************** 
app.get('/users/getAll', async function(req, res){
    const data = await getAllUsers(connection,{});
    res.send(data);
})

app.get('/users/get/:id', async function(req, res){
    const data = await getUserById(connection,req.params.id);
    res.send(data);
})

// app.post('/users/add', parser, async function(req,res) {
//     console.log("hello");
//     const data = await addUser(req.body);
//     console.log(data);
//     res.send(data);
// })
app.post('/users/add', upload.single('profile_image'), async (req, res) => {
    const user_details = {
        ...req.body,
        profile_image: req.file.buffer // Store the image as a buffer
    };
    
    const data = await addUser(user_details);
    console.log(data);
    res.send(data);
});

app.put('/users/update/:id', async function(req, res){
    const data = await updateUser(req.params.id,req.body.password_hash);
    res.send(data);
})

app.delete('/users/delete/:id', async function(req, res){
    const data = await deleteUser(req.params.id);
    res.send(data);
})
