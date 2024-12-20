import axios from "axios";

export const PokedexApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
})