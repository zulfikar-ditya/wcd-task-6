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

export default function OneGrid() {
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
		<div>
			{pokemons.length === 0 ? (
				<div className="text-center py-4">No Pokémon found matching your search.</div>
			) : (
				<div className="grid grid-cols-1 gap-6 mt-4">
					{pokemons.map((pokemon) => (
						<Link href={`/${pokemon.id}`} key={pokemon.id}>
							<div className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105 cursor-pointer">
								<div className="flex justify-between items-center mb-2">
									<div className="flex gap-2">
										{pokemon.type.map((type, index) => (
											<span
												key={index}
												className="font-bold text-green-500 text-base"
											>
												{type},
											</span>
										))}
									</div>
									<span className="text-gray-500">#{pokemon.id}</span>
								</div>

								<div className="flex justify-center">
									<Image
										src={pokemon.image}
										alt={pokemon.name}
										className="h-48 w-48 object-contain"
										width={192}
										height={192}
									/>
								</div>

								<h2 className="text-xl font-bold text-center mt-2 text-gray-800">
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
