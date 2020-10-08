// Vue with native ES6 (could not work in all browsers, check https://caniuse.com/ for every ES6 feature)
// I just tested that it works on Chrome v65

const app = new Vue({
  el: '#app',
  data() {
    return {
      searchText: '',
      TYPE_COLOR: {
        "grass": "#78C850",
        "poison": "#A040A0",
        "fire": "#F08030",
        "flying": "#A890F0",
        "water": "#6890F0",
        "bug": "#A8B820",
        "normal": "#A8A878",
        "electric": "#F8D030",
      },
      selectedTypes: [],
      pokemons: [],
    };
  },
  computed: {
    filteredPokemons() {
      return this.pokemons
        .filter(pokemon => pokemon.name.includes(this.searchText)) // filter by pokemon name (searchBox)
        .filter(pokemon => { // filter by pokemon type (checkboxes)
          if (this.selectedTypes.length === 0) return true; // no checked checkbox means no filter
          return pokemon.types
            .find(type => this.selectedTypes.includes(type));
        });;
    },
  },
  methods: {
    removePokemon(pokemonToDelete) {
      this.pokemons = this.pokemons
        .filter(pokemon => pokemon !== pokemonToDelete);
    },
  },
  created() {
    fetch('https://raw.githubusercontent.com/rubnvp/vue-pokedex/master/data/pokemons.json')
      .then(response => response.json())
      .then(pokemons => this.pokemons = pokemons);
  },
});