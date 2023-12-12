const express = require('express');
const cors = require('cors');
const songsRouter = require("./songsRouter");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use("/", songsRouter);

app.listen(PORT, console.log(`Server running on port ${PORT}...`));
