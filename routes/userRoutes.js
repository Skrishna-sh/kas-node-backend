const express = require('express')
const router = express.Router();
const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = require('../controllers/userControllers');

