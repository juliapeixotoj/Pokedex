const pokeContainer = document.querySelector(".pokeContainer");
const pokemonCount = 1000;
let currentPage = 1;
 
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};
 
const mainTypes = Object.keys(colors);
 
const fetchPokemons = async (page, searchQuery = '') => {
    const offset = (page - 1) * pokemonCount;
    let url;
 
    if (searchQuery) {
        url = `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`;
    } else {
        url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}&offset=${offset}`;
    }
 
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        //console.log(data)   
        if (data.name || (data.results && data.results.length > 0)) {
            // Se a busca retornar um Pokémon específico ou uma lista de Pokémon
            if (data.name) {
                createPokemonCard(data);
            } else {
                for (const pokemon of data.results) {
                    const pokemonData = await fetch(pokemon.url).then(response => response.json());
                    createPokemonCard(pokemonData);
                }
            }
        } else {
            console.log("Nenhum resultado encontrado.");
        }
    } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
    }
};
 
var content = document.querySelector(".pokeContainer")
var inputSearch = document.querySelector("#CampoPesquisa")

inputSearch.addEventListener('change', async() => {
        let url = `https://pokeapi.co/api/v2/pokemon/${inputSearch.value.toLowerCase()}`; 
            const resp =  await fetch(url);
            const data1 =  await resp.json();
            pokeContainer.innerHTML = ''
            createPokemonCard(data1)
            console.log('ok')
        
    });

const createPokemonCard = (poke) => {
    const card  = document.createElement('div')
    card.classList.add("pokemon")
 
    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')
 
    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]
 
    card.style.backgroundColor = color
 
    const pokemonInnerHTML = `
<div class="imagemContainer">
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
</div>
 
    <div class="info">
<span class="number">#${id}</span>
<h3 class="name">${name}</h3>
<small class="type">Type: <span>${type}</span></small>
</div>
    `
 
    card.innerHTML = pokemonInnerHTML
 
    pokeContainer.appendChild(card)
 
};
 
fetchPokemons();