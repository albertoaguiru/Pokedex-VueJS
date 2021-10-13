
var typeAndColor = {
    grass: "#bbffb6",
    poison: "#eda6ff",
    normal: "#eeeeee",
    electric: "#ffffab",
    psychic: "#fcd0ff",
    fairy: "#ffd7f5",
    ice: "#bce6ff",
    fight: "#d8cab1",
    ground: "",
    water: "#dde0ff",
    fire: "#fbe9c0",
    rock: "",
    bug: "#95d2a8",
    flying: "white",
    steel: "",
    dark: "#888888",
    ghost: "#b98bcc",
    dragon: "#9989b7"
}

Vue.component('pokemon', {
    data() {
        return {
            typeColors: null
        }
    },

    props: {
        pokemondata: Object
    },

    computed: {
        backgroundStyle() {
            if (this.pokemondata.types.length < 2) {
                return {
                    backgroundColor: this.typeColors[this.pokemondata.types[0]]
                };
            }
            else {
                return {
                    background: `linear-gradient(77deg, ${this.typeColors[this.pokemondata.types[0]]} 0%, ${this.typeColors[this.pokemondata.types[1]]} 100%)`
                };
            }
        },
        backgroundStyleInverse() {
            if (this.pokemondata.types.length < 2) {
                return {
                    backgroundColor: this.typeColors[this.pokemondata.types[0]]
                };
            }
            else {
                return {
                    background: `linear-gradient(77deg, ${this.typeColors[this.pokemondata.types[1]]} 0%, ${this.typeColors[this.pokemondata.types[0]]} 100%)`
                };
            }
        }
    },

    created() {
        this.typeColors = typeAndColor;
    },

    template: `
        <li class="pokemonCard">
            <div class="facesContainer">
                <div class="frontFace" v-bind:style="backgroundStyle">
                    <div class="favHeart"></div>
                    <div class="pokemonImage"
                            v-bind:style="{ backgroundImage: 'url(' + pokemondata.sprites.front_default + ')' }">
                        <div class="pokeball"></div>
                    </div>
                    <div class="pokemonName">{{ pokemondata.name }}</div>
                    <ul class="typeList">
                        <li v-for="type in pokemondata.types"><img v-bind:src="'./assets/' + type + '.webp'">{{ type }}</li>
                    </ul>
                </div>
                <div class="backFace" v-bind:style="backgroundStyleInverse">
                    <div class="pokemonImage"
                            v-bind:style="{ backgroundImage: 'url(' + pokemondata.sprites.back_default + ')' }">
                        <div class="pokeball"></div>
                    </div>
                    <ul class="typeList">
                        <li>Weight: {{ pokemondata.weight }}</li>
                        <li>Height: {{ pokemondata.height }}</li>
                    </ul>
                </div>
            </div>            
        </li>
    `,
})

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        myDate: new Date(),
        pokemonList: pokemonData,

        loading: true,

        filterName: "",
        searchFav: false,
    },

    computed: {
        pokeJson() {
            return "";//JSON.stringify(this.pokemonList)
        },
        pokemonFiltered() {
            let pokes = this.pokemonList.filter((pok) =>
                pok.name.toLowerCase().indexOf(this.filterName.toLowerCase()) > -1
            );

            if (this.searchFav) {
                return pokes.filter((poke) => {
                    return poke.fav;
                });
            }

            return pokes;
        }
    },

    methods: {
        addFav (index) {
            this.pokemonList[index].fav = !this.pokemonList[index].fav;
        }
    },

    mounted() {
        // load the info of the first 151 Pokémon and save it into the pokemonList
        /*for (let i = 1; i <= 151; i++) {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
                .then(response => {
                    let newPoke = {
                        id: response.data.id,
                        name: response.data.name,
                        height: response.data.height,
                        weight: response.data.weight,
                        sprites: response.data.sprites,
                        types: [],
                        fav: false
                    }
                    for (let i = 0; i < response.data.types.length; i++)
                        newPoke.types.push(response.data.types[i].type.name);
    
                    this.pokemonList.push(newPoke);
                })
                .catch(error => console.log(error))
                .finally(() => this.loading = false);
        }*/
        // for sorting the array
        /*pokemonData.sort(function(a, b) {
            return a.id - b.id;
        });*/

        // we presuppose that the array of pokemon is fully loaded in a global variable called pokemonData
        this.pokemonList = pokemonData;
    }
    
});

