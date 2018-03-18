(function(){
var pokemonTypeColor = {
    "normal": "#A8A878",
    "fire": "#F08030",
    "fighting": "#C03028",
    "water": "#6890F0",
    "grass": "#78C850",
    "poison": "#A040A0",
    "electric": "#F8D030",
    "ground": "#E0C068",
    "rock": "#B8A038",
    "bug": "#A8B820",
    "dragon": "#7038F8",
    "ghost": "#705898",
    "dark": "#705848",
    "fairy": "#EE99AC",
    "steel": "#B8B8D0",
    "psychic": "#F85888",
    "ice": "#98D8D8",
    "flying": "#A890F0"
};

var app = new Vue({
    el: '#app',
    data: {
        message: 'ola k ase?',
        pokemons: [],
    },
    methods: {
        getPokemonTypeColor: function(type) {
            return pokemonTypeColor[type];
        },
        removePokemon: function(pokemonToRemove) {
            this.pokemons = this.pokemons
                .filter(function(pokemon){
                    return pokemon !== pokemonToRemove;
                });
        },
    },
    created: function() {
        var that = this;
        fetch('data/pokemons.json')
            .then(function(response){
                return response.json();
            })
            .then(function(pokemons){
                that.pokemons = pokemons;
            });
    },
});

window.app = app;
})();