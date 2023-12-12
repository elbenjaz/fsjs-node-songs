const express = require('express');
const fs = require('fs');

const router = express.Router();

const songsJSON = "repertorio.json";

router.use(express.json());

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

router.post("/canciones", (req, res) => {
    try {
        const song = req.body;

        if (!song.titulo || !song.artista || !song.tono) {
            res.status(400).json({ error: "Todos los campos son obligatorios: titulo, artista y tono." });
            return false;
        }

        const songs = JSON.parse(fs.readFileSync(songsJSON));
        songs.push(song);
        fs.writeFileSync(songsJSON, JSON.stringify(songs));
        res.status(201).json(songs);
    } catch (error) {
        console.error("Error en la ruta POST /canciones:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/canciones", (req, res) => {
    try {
        const songs = JSON.parse(fs.readFileSync(songsJSON));
        res.json(songs);
    } catch (error) {
        console.error("Error en la ruta GET /canciones:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.put("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        const song = req.body;

        if (!song.titulo || !song.artista || !song.tono) {
            res.status(400).json({ error: "Todos los campos son obligatorios: titulo, artista y tono." });
            return false;
        }

        const songs = JSON.parse(fs.readFileSync(songsJSON));
        const index = songs.findIndex(s => s.id == id);

        if (index == -1) {
            res.status(404).json({ error: "Canción no encontrada" });
            return false;
        }

        songs[index] = song;
        fs.writeFileSync(songsJSON, JSON.stringify(songs));
        res.status(200).send(songs);
    } catch (error) {
        console.error("Error en la ruta PUT /canciones/:id", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.delete("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        const songs = JSON.parse(fs.readFileSync(songsJSON));
        const index = songs.findIndex(s => s.id == id);

        if (index == -1) {
            res.status(404).json({ error: "Canción no encontrada" });
            return false;
        }

        songs.splice(index, 1);
        fs.writeFileSync(songsJSON, JSON.stringify(songs));
        res.json(index);
    } catch (error) {
        console.error("Error en la ruta DELETE /canciones/:id", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
