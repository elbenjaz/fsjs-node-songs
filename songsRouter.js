const express = require('express');
const fs = require('fs');
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

router.post("/canciones", (req, res) => {
    const song = req.body
    const songs = JSON.parse(fs.readFileSync("repertorio.json"));
    songs.push(song);
    fs.writeFileSync("repertorio.json", JSON.stringify(songs));
    res.json(songs);
});

router.get("/canciones", (req, res) => {
    const songs = JSON.parse(fs.readFileSync("repertorio.json"));
    res.json(songs);
});

router.put("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const song = req.body;
    const songs = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = songs.findIndex(p => p.id == id);
    songs[index] = song;
    fs.writeFileSync("repertorio.json", JSON.stringify(songs));
    res.send(songs);
});

router.delete("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const songs = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = songs.findIndex(p => p.id == id);
    if (index == -1) {
        res.json("error");
        return false;
    }

    songs.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(songs));
    res.json(index);
});

module.exports = router;