<template>
    <table>
        <tr>
            <th>Name</th>
            <th>Types</th>
        </tr>
        <tr v-for="(pokemon, index) in pokemons" :key="pokemon.id">
            <slot name="row" :pokemon="pokemon" :index="index"></slot>
        </tr>
                <!-- <td>{{ pokemon.name }}</td>
                <td>{{ pokemon.types.join(', ') }}</td> -->
    </table>
</template>

<script>
export default {
    props: ['pokemons']
}
</script>