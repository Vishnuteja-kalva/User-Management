const express = require('express');
const { create, getAllUsers, getUserById, UpdateByID, deleteById } = require('./userController');

const route = express.Router();

route.post('/users', create);
route.get('/info', getAllUsers);
route.get('/info/:id', getUserById);
route.put('/update/user/:id', UpdateByID);
route.delete('/delete/user/:id', deleteById);

module.exports = route;
