const bcrypt = require('bcrypt')
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { Result } = require('express-validator');


const secret = 'qwg-igldfw234kmsaa';

const tokenBlackList = new Set();

async function register(email, firstname, lastname, personalinfo, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Email in taken!');
    }

    const user = await User.create({
        email,
        firstname,
        lastname,
        hashedPassword: await bcrypt.hash(password, 10),
        personalinfo,
    });

    return createToken(user);
};

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect username or password!');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorrect username or password!');
    }

    return createToken(user);
};

async function logout(token) {
    tokenBlackList.add(token); 
};

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        personalinfo: user.personalinfo
    };

    return {
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        personalinfo: user.personalinfo,
        accessToken: jwt.sign(payload, secret)
    }
};

async function getProfile(userId) {

    return User.findById(userId).select("-hashedPassword");
};

async function editProfile(userId, profile) {
    const existing = await User.findById(userId);

    existing.firstname = profile.firstname;
    existing.lastname = profile.lastname;
    existing.personalinfo = profile.personalinfo;

    return existing.save();
};

function parseToken(token) {
    if(tokenBlackList.has(token)) {
        throw new Error('Token is blacklisted!')
    }

    const payload = jwt.verify(token, secret);
    return payload
};

module.exports = {
    register,
    login,
    logout,
    parseToken,
    getProfile,
    editProfile
};