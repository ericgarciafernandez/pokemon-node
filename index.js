const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();


app.use(cors());
app.use(express.json());

const getPokemons = () => {
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0')
        .then((apiResponse) => {
            return apiResponse.data.results;
        })
        .catch((error) => {
            console.error('Error fetching Pokemon data:', error);
            throw error;
        });
};

const getEspecificPokemon = (request) => {
    console.log(request.params.id);
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + request.params.id)
        .then((apiResponse) => {
            return apiResponse.data;
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

app.get('/api/pokemons/:id', async (request, response) => {
    try {
        const pokemonData = await getEspecificPokemon(request);
        response.json(pokemonData);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use((request, response) => {
    response.status(404).json({ error: 'Not found' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});