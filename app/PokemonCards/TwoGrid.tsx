import React from "react";
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
	const pokemons: Pokemon[] = pokemonData.data;

	return (
		<div className="mt-4">
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
		</div>
	);
}
