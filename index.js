const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const getPokemons = () => {
    return axios.get('https://pokeapi.co/api/v2/pokemon/')
        .then((apiResponse) => {
            return apiResponse.data.results;
        })
        .catch((error) => {
            console.error('Error fetching Pokemon data:', error);
            throw error;
        });
};

app.get('/', (request, response) => {
    response.send('test');
});

app.get('/api/pokemons', async (request, response) => {
    try {
        const pokemonData = await getPokemons();
        response.json(pokemonData);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});