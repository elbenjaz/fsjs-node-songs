const express = require('express');
const cors = require('cors');
const songsRouter = require("./songsRouter");
/*
//[package.json] + "type": "module"
import express from 'express';
import cors from 'cors';
import songsRouter from './songsRouter.js';
*/

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use("/", songsRouter);

app.listen(PORT, console.log(`Server running on port ${PORT}...`));
