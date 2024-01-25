require('dotenv').config();
const express = require("express");
// const config = require("./config.js");
const mongoose = require("mongoose");
const booksRoute = require("./routes/booksRoute.js");
const cors = require("cors");
const userAuth = require("./routes/userAuth.js");

// const { PORT, mongoDBURL } = config;

// import express from "express";
// import {
//     PORT,
//     mongoDBURL,
//     JWT_SECRET,
//     TOKEN_EXPIRY,
//     CLIENT_URL,
//     EMAIL_SERVICE,
//     EMAIL_USER,
//     EMAIL_PASSWORD,
//     USER
// } from "./config.js";
// import mongoose from "mongoose";
// import booksRoute from "./routes/booksRoute.js";
// import cors from "cors";
// import userAuth from "./routes/userAuth.js";


const app = express();

app.use(express.json());

app.use(cors());

// app.use(
    
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','PUT','POST','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
    
// );
app.use('/', userAuth);
app.use('/', booksRoute);

mongoose.connect(process.env.mongoDBURL)
    .then(() => {
        console.log('Connected to Database');
        app.listen(process.env.PORT, () => {
            console.log(`Listening to port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });