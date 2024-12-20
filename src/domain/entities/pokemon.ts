import { Move, Species } from "../../infrastructure/interfaces/pokemon-response.interface";

export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    avatar: string;
    sprites: string[]
    color: string

    games: string[],
    stats: Species[],
    abilities: string[]
    moves: Move[]
}
