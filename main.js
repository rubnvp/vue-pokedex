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

Vue.component('nice-input', {
    template: `
<div class="nice-input-wrapper">
    <input class="nice-input" type="text" placeholder="Search by name" :value="value" @input="changeText">
    <span class="focus-border"><i></i></span>
</div>`,
    props: ['value'],
    methods: {
        changeText: function(event){
            this.$emit('input', event.target.value);
        },
    },
});


Vue.component('nice-checkbox', {
    template: '#nice-checkbox-template',
    props: ['value', 'color', 'name', 'count'],
    computed: {
        selectedList: {
            get: function() {
                return this.value;
            },
            set: function(value) {
                this.$emit('input', value);
            },
        },
    },
});

var PokemonCard = {
    template: '#pokemon-card-template',
    props: ['pokemon', 'colors'],
    methods: {
        remove: function() {
            this.$emit('remove', this.pokemon);
        },
    },
};

var app = new Vue({
    el: '#app',
    data: {
        searchboxText: '',
        selectedPokemonTypes: [],
        pokemonTypes: Object.assign({}, pokemonTypeColor),
        pokemons: [],
    },
    computed: {
        filteredPokemons: function() {
            var that = this;
            return this.pokemons
                .filter(function(pokemon){ // filter by name
                    return pokemon.name.includes(that.searchboxText);
                })
                .filter(function(pokemon){ // filter by type
                    if (!that.selectedPokemonTypes.length) return true;
                    return that.selectedPokemonTypes.includes(pokemon.types[0]) ||
                        pokemon.types[1] && that.selectedPokemonTypes.includes(pokemon.types[1]);
                });
        },
        pokemonCountByType: function() {
            var pokemonCountByType = {};
            for (type in pokemonTypeColor) {
                pokemonCountByType[type] = this.filteredPokemons
                    .filter(function(pokemon){ // filter by type
                        return pokemon.types.includes(type);
                    })
                    .length;
            }
            return pokemonCountByType;
        }
    },
    methods: {
        getPokemonTypeColor: function(type) {
            return pokemonTypeColor[type];
        },
        getBackgroundColors: function(types) {
            return types
                .map(function(type){
                    return pokemonTypeColor[type];
                });
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
    components: {
        PokemonCard: PokemonCard,
    },
});

window.app = app;
})();