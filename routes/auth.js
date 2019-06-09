const express = require('express');

const router = express.Router();

// @route   GET api/auth
// @desc    GET logged a user
// @access  Private
router.get('/', (req, res) => {
    res.send('GET logged a user');    
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', (req, res) => {
    res.send('Auth user & get token');    
});

module.exports = router;