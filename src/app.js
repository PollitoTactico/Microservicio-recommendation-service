const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const TMDB_API_KEY = "ed9f75cf8655856f875f32f624a18783";

app.get("/recommendations", async (req, res) => {
    const { genres } = req.query;

    if (!genres) {
        return res.status(400).json({ error: "Géneros no proporcionados" });
    }

    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genres}`
        );
        console.log('TMDB Response:', response.data); // Ver el cuerpo completo de la respuesta
        if (response.data.results.length === 0) {
            return res.status(404).json({ error: "No se encontraron películas con esos géneros" });
        }
        res.json(response.data.results);
    } catch (error) {
        console.error('Error en la solicitud a TMDB:', error);
        res.status(error.response?.status || 500).json(error.response?.data || { error: "Error interno" });
    }
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Recommendation service running on http://localhost:${PORT}`));
