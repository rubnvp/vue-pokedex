(function(){
var pokemonTypeToColor = {
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
        pokemon: {
            "id":4,
            "name":"charmander",
            "image":"images/pokemons/charmander.png",
            "types":[
                "fire"
            ],
            "abilities":[
                "solar-power",
                "blaze"
            ],
            "experience":62,
            "height":6,
            "weight":85
        },
    },
    methods: {
        getPokemonTypeColor: function(type) {
            return pokemonTypeToColor[type];
        },
    }
});

window.app = app;
})();