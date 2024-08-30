const mongoose = require("mongoose");
async function mongoDB() {
    mongoose.connect("mongodb+srv://shrikrishnagopalrsharma:CrBT5fsGUQkNXff0@cluster0.qqhgcmu.mongodb.net/Training_session_neo?retryWrites=true&w=majority&appName=Cluster0")
    .then(res => {console.log("MongoDB connected....");
        // require('../mongodbmodel/EmployeeModel')
    } )
    .catch(err => console.log(err))
}

module.exports = mongoDB;