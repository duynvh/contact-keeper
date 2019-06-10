const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('config');
const auth = require('./../middlewares/auth');
const { check, validationResult } = require('express-validator/check')

const User = require('../models/User');

// @route   GET api/auth
// @desc    GET logged a user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user)
    } catch (err) {
        res.status(500).send('Server error');
    } 
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({msg: 'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: 'Invalid Credentials'})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600 * 24
        }, (err, token) => {
            if (err) throw err;
            res.json({token});
        });
    } catch (err) {
        res.status(500).send('Server error')
    }
});

module.exports = router;