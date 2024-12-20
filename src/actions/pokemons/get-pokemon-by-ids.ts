import { Pokemon } from "../../domain/entities/pokemon";
import { getPokemonById } from "./get-pokemon-by-id";

export const getPokemonByIds = async (ids: number[]): Promise<Pokemon[]> => {
     try {
            const pokemonsPromises: Promise<Pokemon>[] = ids.map( id => {
                return getPokemonById(id);
            });

            return await Promise.all(pokemonsPromises);
        } catch (error) {
            console.log({ error });
            throw new Error(`Error getting pokemons by ids`);
        }
}