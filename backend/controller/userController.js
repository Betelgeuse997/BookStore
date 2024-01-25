// const bcrypt = require("bcryptjs");
// const userModel = require("../models/userModel.js");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET, TOKEN_EXPIRY } = require("../config.js");
require('dotenv').config();
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const { JWT_SECRET, TOKEN_EXPIRY } = require("../config.js");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
};

const getUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email});

        if (!user) {
            res.status(202).json({ message: "User not found"});
        } else {
            const matchPassword = await bcrypt.compare(password, user.password);

            if (matchPassword) {
                const token = createToken(user._id);
                res
                    .status(200)
                    .json({ message: "Signing in...", token, userId: user._id});
            } else {
                res.status(201).json({ message: "Wrong Password"});
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingNameUser = await userModel.findOne({ name });
        const existingEmailUser = await userModel.findOne({ email });

        if (existingNameUser) {
            res.json({ message: " Username already exists "});
        } else if (existingEmailUser) {
            res.json({ message: " Email ID already exists "});
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
      
            const user = await userModel.create({
              name,
              email,
              password: hashedPassword,
              followers: 0,
              following: 0,
            });

            res.json({ message: "Account created successfully" });
        }
    } catch (err) {
            res.status(500).json(err);
    }
};



module.exports = { getUser, createUser };
// export default {getUser,createUser};