import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import pokemonData from "../pokemon.json";
import Link from "next/link";
import Image from "next/image";

interface PokemonStats {
	health: number;
	maxHealth: number;
	attack: number;
	defense: number;
}

interface Pokemon {
	id: number;
	name: string;
	type: string[];
	image: string;
	stats: PokemonStats;
}

export default function TwoGrid() {
	const { searchTerm, orderBy } = useSelector((state: RootState) => state.pokemon);
	let pokemons: Pokemon[] = pokemonData.data;

	// Filter by search term
	if (searchTerm) {
		pokemons = pokemons.filter(pokemon => 
			pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			pokemon.type.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
		);
	}

	// Sort by orderBy
	if (orderBy) {
		pokemons = [...pokemons].sort((a, b) => {
			switch (orderBy) {
				case 'name':
					return a.name.localeCompare(b.name);
				case 'id':
					return a.id - b.id;
				case 'attack':
					return b.stats.attack - a.stats.attack;
				case 'defense':
					return b.stats.defense - a.stats.defense;
				default:
					return 0;
			}
		});
	}

	return (
		<div className="mt-4">
			{pokemons.length === 0 ? (
				<div className="text-center py-4">No Pokémon found matching your search.</div>
			) : (
				<div className="grid grid-cols-2 gap-4">
					{pokemons.map((pokemon) => (
						<Link href={`/${pokemon.id}`} key={pokemon.id}>
							<div className="bg-white rounded-lg shadow-md p-3 transition-transform hover:scale-105 cursor-pointer">
								<div className="flex justify-center">
									<Image
										src={pokemon.image}
										alt={pokemon.name}
										className="h-32 w-32 object-contain"
										width={128}
										height={128}
									/>
								</div>
								<h2 className="text-center font-semibold mt-2 text-gray-800">
									{pokemon.name}
								</h2>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
