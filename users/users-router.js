const express = require('express');
const knex = require('knex');

const db = require('../database/dbConfig');

const Users = require('./users-model.js');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const users = await db('users');
      res.json(users); 
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve users' });
    }
});

router.post('/', async (req, res) => {
    const userData = req.body;

    try {
      const user = await Users.insert(userData);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new user' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await Users.remove(id)
  
      if (user) {
        res.json({ removed: user });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
});

module.exports = router;