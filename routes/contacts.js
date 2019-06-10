const express = require('express');
const router = express.Router();
const auth = require('./../middlewares/auth');
const { check, validationResult } = require('express-validator/check')

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    GET all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { name, email, phone, type } = req.body;
    try {
        const contact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const data = await contact.save();
        res.json({contact: data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/contacts
// @desc    Update contact
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update contact');    
});

// @route   DELETE api/contacts
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete contact');    
});

module.exports = router;