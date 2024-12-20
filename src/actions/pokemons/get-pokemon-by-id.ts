import { PokedexApi } from "../../config/api/pokedexApi";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokemonResponse } from "../../infrastructure/interfaces/pokemon-response.interface";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";

export const getPokemonById = async (pokemonId: number): Promise<Pokemon> => {
     try {
            const url = `/pokemon/${pokemonId}`;
            const { data } = await PokedexApi.get<PokemonResponse>(url);

            const pokemon = await PokemonMapper.pokemonApiPokemonToEntity(data)
            console.log(pokemon);
            
            
            return pokemon;
        } catch (error) {
            console.log({ error });
            throw new Error(`Error getting pokemons`);
        }
}