const { getAllEmployee, getEmployeeById, addEmployee } = require('./api/EmployeeApi');
const mongoDB = require("./config/mongoDB");
const express = require('express');
const bodyParser = require('body-parser');
// const { getAllUsers } = require("./api/usersApi");
const connectDB = require("./config/mysqlDB");
const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = require('./api/usersApi');
const { middle1, middle2 } = require('./middlewares/middleware');
const multer = require("multer")
require('dotenv').config()
console.log(process.env) // remove this 



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const app = express();

app.use(express.json());

// app.use(middle1);
// app.use(middle2);

mongoDB();
 const connection = connectDB();
app.listen(5000, ()=>{ console.log("Application Server is running on port 5000")});

app.get('/', function(req, res){
    res.send("Welcome to first node with express");
})

app.get('/employees/getAll', async function(req, res){
    const data = await getAllEmployee();
    res.send(data);
})

app.get('/employees/get/:emp_id', async function(req, res){
    const data = await getEmployeeById(req.params.emp_id);
    res.send(data);
})

const parser = bodyParser.urlencoded({extended:true})
app.post('/employees/add', parser, async function(req,res) {
    console.log(req.body);
    const data = await addEmployee(req.body);
    res.send(data);
})
// app.post()


app.get('/users/getAll', async function(req, res){
    const data = await getAllUsers({});
    res.send(data);
})

app.get('/users/get/:id', async function(req, res){
    const data = await getUserById(req.params.id);
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

