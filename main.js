(function(window){
// Vue with native ES6 (could not work in all browsers, check https://caniuse.com/ for every ES6 feature)
// I just tested that it works on Chrome v65

const PokemonCard = {
    props: ['pokemon', 'typeColor'],
    template: '#pokemon-card-template', // or we can just put the html here in a string, or even JSX (build step needed)
    methods: {
        remove() {
            this.$emit('remove', this.pokemon);
        },
    },
};

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
            selectedPokemonTypes: [],
            pokemons: [],
        };
    },
    computed: {
        filteredPokemons() {
            return this.pokemons
                .filter(pokemon => pokemon.name.includes(this.searchText)) // filter by pokemon name (searchBox)
                .filter(pokemon => { // filter by pokemon type (checkboxes)
                    if (this.selectedPokemonTypes.length === 0) return true; // no checked checkbox means no filter
                    return pokemon.types
                        .find(type => this.selectedPokemonTypes.includes(type));
                });;
        },
    },
    methods: {
        removePokemon(pokemonToDelete) {
            this.pokemons = this.pokemons
                .filter(pokemon => pokemon !== pokemonToDelete);
        },
    },
    created() { // Component Lyfecycle Diagram https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
        fetch('https://api.jsonbin.io/b/5ab37f77989617146bd6eb29') 
            .then(response => response.json())
            .then(pokemons => this.pokemons = pokemons);
    },
    components: {
        PokemonCard,
    },
});

window.app = app;
})(window);