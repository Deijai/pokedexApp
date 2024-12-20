import { PokedexApi } from "../../config/api/pokedexApi";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokemonPaginatedResponse, PokemonResponse } from "../../infrastructure/interfaces/pokemon-response.interface";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";

export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {
    try {
        const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
        const { data } = await PokedexApi.get<PokemonPaginatedResponse>(url);

        const pokemonPromises = data.results.map((info) => {
            return PokedexApi.get<PokemonResponse>(info.url);
        });

        const pokeApiPokemons = await Promise.all(pokemonPromises);
        const pokemonsPromises = pokeApiPokemons.map(item => PokemonMapper.pokemonApiPokemonToEntity(item.data));
        
        return await Promise.all(pokemonsPromises);
    } catch (error) {
        console.log({ error });
        throw new Error(`Error getting pokemons`);
    }
}