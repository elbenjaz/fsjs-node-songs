const express = require('express');
const songsRouter = require("./songsRouter");
const app = express();
const cors = require('cors');

app.use(cors());

app.use("/", songsRouter);

app.listen(3000, console.log("¡Servidor encendido!"));
