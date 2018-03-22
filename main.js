(function(window){
// Vue "normal JS" (ES5) example of use, more info about ES5 and ES6 https://medium.com/front-end-hacking/es6-vs-es5-9254f8390332
// in the git branch 'es6' you can find the ES6 version (is highly support in some browsers but check first at https://caniuse.com/)

// Vue.component register the component to be global available in every Vue template, usually I prefer to define this as
// an object (the second parameter) an include it in every Vue instance that I need (explicit better than implicit)
// visit https://vuejs.org/v2/guide/components.html for more info
Vue.component('pokemon-card', {
    props: ['pokemon', 'typeColor'],
    template: '#pokemon-card-template', // or we can just put the html here in a string, or even JSX (build step needed)
    methods: {
        remove: function(){
            this.$emit('remove', this.pokemon);
        },
    },
});

var app = new Vue({
    el: '#app',
    data: { // usually you define data as a function that returns an object in order to avoid have the same data if you have more than one instance
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
    },
    computed: {
        filteredPokemons: function(){
            // var 'that' is needed in order to refer it from the filter function
            // we could avoid this with ES6 arrow functions
            var that = this;
            return this.pokemons
                .filter(function(pokemon) { // filter by pokemon name (searchBox)
                    return pokemon.name.includes(that.searchText);
                })
                .filter(function(pokemon) { // filter by pokemon type (checkboxes)
                    if (that.selectedPokemonTypes.length === 0) return true; // no checked checkbox means no filter
                    return pokemon.types
                        .find(function(type){ // for each pokemon type we try to find if it's included in the array of selectedPokemonTypes 
                            return that.selectedPokemonTypes.includes(type);
                        });
                });;
        },
    },
    methods: {
        removePokemon: function(pokemonToDelete){
            this.pokemons = this.pokemons
                .filter(function(pokemon){
                    return pokemon !== pokemonToDelete; // this works because is the same object (the pokemons array is the single source of truth here)
                });
        },
    },
    created: function(){ // function executed just after setting the reactivity https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
        var that = this;
        // fetch native api, https://caniuse.com/#feat=fetch
        // you also have the pokemon json info in data/pokemons.json but you will need a local server to serve it
        fetch('https://api.jsonbin.io/b/5ab37f77989617146bd6eb29') 
            .then(function(response){
                return response.json();
            })
            .then(function(pokemons){
                that.pokemons = pokemons;
            });
    },
});

// Vue is so flexible that we can even do the fetch in a totally separated context
// but don't do this, is better to have the fetch in the created method
/*fetch('data/pokemons.json')
    .then(function(response){
        return response.json();
    })
    .then(function(pokemons){
        debugger;
        app.pokemons = pokemons;
    });*/

window.app = app; // just put the Vue instance available in the JS console (don't do this in production)
})(window); // this is a self invoke function https://sarfraznawaz.wordpress.com/2012/01/26/javascript-self-invoking-functions/