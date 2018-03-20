(function(){
var pokemonTypeColor = {
    "grass": "#78C850",
    "poison": "#A040A0",
    "fire": "#F08030",
    "flying": "#A890F0",
    "water": "#6890F0",
    "bug": "#A8B820",
    "normal": "#A8A878",
    "electric": "#F8D030"
};

var app = new Vue({
    el: '#app',
    data: {
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