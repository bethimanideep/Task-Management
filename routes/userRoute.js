const express = require('express')
const userRoute = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { userModel } = require('../models/usermodel')
require('dotenv').config()

//Signup Route
userRoute.post('/register', async (req, res) => {
    try {
        let { name, email, password } = req.body
        //Checking Fields
        if (!name || !email || !password) return res.json('Improper Registration Fields');
        //Checking Email If Present
        let user = await userModel.findOne({ email })
        if (user) return res.json('Already User Exists')
        //Password Hashing
        let hash = bcrypt.hashSync(password, 10)
        let data = {
            name,
            email,
            password: hash
        }
        //Save Data
        let userdata = new userModel(data)
        await userdata.save()
        return res.status(201).json('User Registered Successfully')
    } catch (error) {
        res.status(500).json({ msg: "error in register", error })
    }
})

// Login Route
userRoute.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        // Checking Fields
        if (!email || !password) return res.status(400).json({ error: 'Improper Login Fields.', details: 'Both email and password are required.' });
        // Checking Email
        let user = await userModel.findOne({ email })
        if (!user) return res.status(404).json({ error: 'User Not Found', details: 'No user with the provided email address.' });
        // Checking Password
        let passwordcheck = bcrypt.compareSync(password, user.password)
        if (!passwordcheck) return res.status(401).json({ error: 'Invalid Password', details: 'The provided password is incorrect.' });
        // Generating Token and RefreshToken
        let token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '1h' })
        let refreshtoken = jwt.sign({ user }, process.env.SECRET, { expiresIn: '2h' })
        
        return res.status(201).json({
            msg: 'User LoggedIn Successfully',
            token,
            refreshtoken
        })
    } catch (error) {
        res.status(500).json({ msg: "error in login", error: error.message });
    }
})


//Generate Token Using RefreshToken
userRoute.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.refreshToken;
    //Checking RefreshToken
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token is missing' });

    // Verify RefreshToken
    jwt.verify(refreshToken, process.env.SECRET, (err, decoded) => {

        if (err) return res.status(401).json({ message: 'Invalid refresh token' });
        //Generating Token
        const accessToken = jwt.sign({ decoded }, process.env.SECRET, { expiresIn: '1h' });

        res.status(201).json({ accessToken });
    });
});



module.exports = userRoute