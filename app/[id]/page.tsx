"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import pokemonData from "../pokemon.json";
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

export default function PokemonDetailPage() {
	const params = useParams();
	const id = Number(params.id);
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);

	useEffect(() => {
		const foundPokemon = pokemonData.data.find((p) => p.id === id);
		if (foundPokemon) {
			setPokemon(foundPokemon);
		}
	}, [id]);

	if (!pokemon) {
		return <div className="container mx-auto p-4">Loading...</div>;
	}

	const healthPercentage =
		(pokemon.stats.health / pokemon.stats.maxHealth) * 100;

	return (
		<div className="container mx-auto p-4 max-w-3xl">
			{/* Pokemon ID at the top */}
			<div className="mb-2">
				<span className="text-xl font-bold text-gray-400">#{pokemon.id}</span>
			</div>

			{/* Pokemon Image */}
			<div className="bg-transparent rounded-lg p-6 flex justify-center mb-6">
				<Image
					src={pokemon.image}
					alt={pokemon.name}
					className="h-64 w-64 object-contain"
					width={256}
					height={256}
				/>
			</div>

			{/* Pokemon Name and Small Image */}
			<div className="flex justify-between items-center bg-transparent rounded-lg p-4 mb-6">
				<h1 className="text-3xl font-bold text-gray-200">{pokemon.name}</h1>
				<Image
					src={pokemon.image}
					alt={pokemon.name}
					className="h-12 w-12 object-contain"
					width={48}
					height={48}
				/>
			</div>

			{/* Pokemon Type */}
			<div className="flex gap-2 mb-6">
				{pokemon.type.map((type, index) => (
					<span key={index} className="font-bold text-green-500 text-base">
						{type}
					</span>
				))}
			</div>

			{/* Pokemon Stats Card */}
			<div className="bg-[#05091B] rounded-lg p-6 shadow-md">
				{/* Health with Progress Bar */}
				<div className="mb-4">
					<div className="">
						<span className="text-gray-400 font-medium">Health</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2.5">
						<div
							className="bg-green-600 h-2.5 rounded-full"
							style={{ width: `${healthPercentage}%` }}
						></div>
					</div>
					<span className="text-gray-200 text-2xl font-semibold">
						{pokemon.stats.health} from {pokemon.stats.maxHealth}
					</span>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="">
						<h4 className="text-gray-700">Attack</h4>
						<p className="font-semibold text-xl">{pokemon.stats.attack}</p>
					</div>
					<div className="">
						<h4 className="text-gray-700">Defense</h4>
						<p className="font-semibold text-xl">{pokemon.stats.defense}</p>
					</div>
				</div>
			</div>

			{/* Back button */}
			<div className="mt-6">
				<button
					onClick={() => window.history.back()}
					className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
				>
					&larr; Back
				</button>
			</div>
		</div>
	);
}
