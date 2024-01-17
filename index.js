const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();


app.use(cors());
app.use(express.json());

const getAllPokemons = (request) => {
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then((apiResponse) => {
            return apiResponse.data.results;
        })
        .catch((error) => {
            console.error('Error fetching Pokemon data:', error);
            throw error;
        });
};

const getPokemons = (request) => {
    return axios.get('https://pokeapi.co/api/v2/pokemon/?offset=' + request.params.numOffset)
        .then((apiResponse) => {
            return apiResponse.data.results;
        })
        .catch((error) => {
            console.error('Error fetching Pokemon data:', error);
            throw error;
        });
};

const getEspecificPokemon = (request) => {
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + request.params.name)
        .then((apiResponse) => {
            return apiResponse.data;
        })
        .catch((error) => {
            console.error('Error fetching Pokemon data:', error);
            throw error;
        });
};

const getTypePokemon = (request) => {
    return axios.get('https://pokeapi.co/api/v2/type')
        .then((apiResponse) => {
            return apiResponse.data.results;
        })
        .catch((error) => {
            console.error('Error fetching Pokemon data:', error);
            throw error;
        });
}

const getPokemonsWithType = (request) => {
    return axios.get('https://pokeapi.co/api/v2/type/' + request.params.name)
        .then((apiResponse) => {
            return apiResponse.data.pokemon;
        })
        .catch((error) => {
            console.error('Error fetching Pokemon data:', error);
            throw error;
        });
}

app.get('/', (request, response) => {
    response.send('test');
});

app.get('/api/pokedex', async (request, response) => {
    try {
        const pokemonData = await getAllPokemons(request);
        response.json(pokemonData);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/pokedex/:numOffset', async (request, response) => {
    try {
        const pokemonData = await getPokemons(request);
        response.json(pokemonData);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/pokemons/:name', async (request, response) => {
    try {
        const pokemonData = await getEspecificPokemon(request);
        response.json(pokemonData);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/types', async (request, response) => {
    try {
        const pokemonData = await getTypePokemon(request);
        response.json(pokemonData);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/types/:name', async (request, response) => {
    try {
        const pokemonData = await getPokemonsWithType(request);
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