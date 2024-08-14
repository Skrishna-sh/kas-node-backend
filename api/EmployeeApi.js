const EmployeeModel = require("../mongodbmodel/EmployeeModel");

async function getAllEmployee(){
    return await EmployeeModel.find({});
}

async function getEmployeeById(empId){
    return await EmployeeModel.findById(empId);
}


async function getEmployeeByIdAndDelete(empId){
    return await EmployeeModel.deleteOne({_id:empId});
}

async function addEmployee(employee){
    const EmployeeDoc=new EmployeeModel(employee);
    return await EmployeeDoc.save();
}

module.exports = {getAllEmployee, getEmployeeById, getEmployeeByIdAndDelete, addEmployee};