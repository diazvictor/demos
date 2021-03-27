/**!
 * @package   Pokedex
 * @filename  app.js
 * @version   1.0
 * @author    Díaz Urbaneja Víctor Eduardo Diex <victor.vector008@gmail.com>
 * @date      23.03.2021 03:58:01 -04
 */
// jshint esversion: 8
// Reference: https://codepen.io/jamesqquick/pen/NWKaNQz

const pokedex = document.getElementById('pokedex');
const filters = document.getElementById('filters');
const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearch');

const base_url = "https://pokeapi.co/api/v2";
const fetchPokemon = async (search, filter) => {
	const promises = [];
	if (search) {
		try {
			const response = await axios.get(`${base_url}/pokemon/${search.toLowerCase()}`);
			if (response) {
				promises.push(response.data);
			}
		} catch (errors) {
			console.error(errors);
			alert("No se pudo encontrar este pokemon");
			searchInput.value = "";
			fetchPokemon();
		}
	} else {
		try {
			for (let i = 1; i <= 10; i++) {
				const response = await axios.get(`${base_url}/pokemon/${i}`);
				if (typeof response == "object") {
					promises.push(response.data);
				}
			}
		} catch (errors) {
			console.error(errors);
		}
	}

	Promise.all(promises).then((results) => {
		const pokemon = results.map((result) => ({
			name: result.name,
			image: result.sprites.front_default,
			type: result.types.map((type) => type.type.name).join(', '),
			id: result.id
		}));
		if (filter) {
			let filteredData = pokemon.filter((element) => {
				let types = element.type.split(', ');
				return types[1] == filter || types[0] == filter;
			});
			displayPokemon(filteredData);
			return;
		}
		displayPokemon(pokemon);
	});

};

const existFilter = (filter) => {
	filter.forEach(exist => {
		let btn_filter = document.getElementById(exist);
		if (!btn_filter) {
			filters.innerHTML += `
				<button type="button" id="${exist}" onclick="filterType('${exist}')">${exist}</button>
			`;
		}
	});
};

const filterType = (type) => {
	fetchPokemon("", type.trim());
};

const displayPokemon = async (pokemon) => {
	pokedex.innerHTML = "";
	const pokemonHTMLString = pokemon.map((pokeman) => `
			<li class="card">
				<img class="card-image" src="${pokeman.image}"/>
				<h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
				<p class="card-subtitle">Type: ${pokeman.type}</p>
			</li>
		`
	).join('');
	pokemon.map((pokeman) => {
		existFilter(pokeman.type.split(','));
	}).join('');
	pokedex.innerHTML = pokemonHTMLString;
};

let searchTerm = '';

btnSearch.addEventListener('click', (e) => {
    search_term = searchInput.value;
    fetchPokemon(search_term);
});

fetchPokemon();
