//DOM
const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image")

const prev = document.querySelector(".btn-prev")
const next = document.querySelector(".btn-next")


const form = document.querySelector(".search");
const input = document.querySelector(".input_search");

let searchPokemonNumber = 1;

// API


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Procurando...';
    pokemonNumber.InnerHTML = " ";

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        pokemonImage.src = data['sprites']['versions']  ["generation-v"]['black-white']['animated']['front_default']

        input.value = "";

        searchPokemonNumber = data.id;
        // colocando os dados da api no html
    }

    else {
        pokemonName.innerHTML = 'Não encontrado.';
        pokemonNumber.innerHTML = "";
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    
});

prev.addEventListener('click', () => {
    if (searchPokemonNumber > 1) {        
        searchPokemonNumber -=1 
        renderPokemon(searchPokemonNumber)
    }
});

next.addEventListener('click', () => {
    searchPokemonNumber +=1 
    renderPokemon(searchPokemonNumber)
});

renderPokemon(searchPokemonNumber)