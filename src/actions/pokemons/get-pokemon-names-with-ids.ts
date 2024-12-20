import { PokedexApi } from "../../config/api/pokedexApi";
import { PokemonPaginatedResponse } from "../../infrastructure/interfaces/pokemon-response.interface";

export const getPokemonNamesWithIds = async (): Promise<{id: number; name: string;}[]> => {
    try {
        const url = `/pokemon?limit=${1000}`;
        const { data } = await PokedexApi.get<PokemonPaginatedResponse>(url);
        return data.results.map(item => {
            return {
                id: Number(item.url.split('/')[6]),
                name: item.name
            }
        })

    } catch (error) {
        console.log({ error });
        throw new Error(`Error getting pokemons by name and id`);
    }
}