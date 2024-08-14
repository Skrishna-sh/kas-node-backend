const mongoose = require('mongoose')
const empSchema = new mongoose.Schema({
    _id : Number,
    emp_name : String,
    emp_email : String,
    emp_salary : Number
})

const EmployeeModel = mongoose.model("employee", empSchema);

module.exports = EmployeeModel;