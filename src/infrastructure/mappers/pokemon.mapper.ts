import { PokemonResponse } from "../interfaces/pokemon-response.interface";
import { Pokemon } from '../../domain/entities/pokemon';
import { useImageColors } from "../../config/helpers/get-color";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

export class PokemonMapper {
    static pokemonApiPokemonToEntity = async (pokemon: PokemonResponse): Promise<Pokemon> => {
        const sprites = PokemonMapper.getSprites(pokemon);
        const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
        const color = await useImageColors(avatar);




        return {
            id: pokemon.id,
            avatar: avatar,
            name: pokemon.name,
            types: pokemon.types.map(item => item.type.name),
            sprites: sprites,
            color: color,
            abilities: pokemon.abilities.map(item => item.ability.name),
            games: pokemon.game_indices.map(item => item.version.name),
            stats: pokemon.stats.map(item => item.stat),
            moves: pokemon.moves,
        }
    }

    static getSprites(data: PokemonResponse): string[] {
        const sprites: string[] = [
            data.sprites.front_default,
            data.sprites.back_default,
            data.sprites.front_shiny,
            data.sprites.back_shiny,
        ];

        if (data.sprites.other?.home.front_default)
            sprites.push(data.sprites.other?.home.front_default);
        if (data.sprites.other?.['official-artwork'].front_default)
            sprites.push(data.sprites.other?.['official-artwork'].front_default);
        if (data.sprites.other?.['official-artwork'].front_shiny)
            sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
        if (data.sprites.other?.showdown.front_default)
            sprites.push(data.sprites.other?.showdown.front_default);
        if (data.sprites.other?.showdown.back_default)
            sprites.push(data.sprites.other?.showdown.back_default);

        return sprites;
    }
}

