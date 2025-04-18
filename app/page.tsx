"use client";

import { useEffect, useState } from "react";
import TwoGrid from "./PokemonCards/TwoGrid";
import OneGrid from "./PokemonCards/OneGrid";

export default function Home() {
	const [isGridView, setIsGridView] = useState<boolean>(false);
	const [OrderBy, setOrderBy] = useState<string | null>(null);

	useEffect(() => {
		localStorage.setItem("isGridView", JSON.stringify(isGridView));
	}, [isGridView]);

	useEffect(() => {
		const storedView = localStorage.getItem("isGridView");
		if (storedView) {
			setIsGridView(JSON.parse(storedView));
		}
	}, []);

	return (
		<main className="py-3">
			<div className="flex justify-between items-center ">
				<select
					onChange={(e) => setOrderBy(e.target.value)}
					className="bg-background-2 text-secondary border border-secondary rounded-md p-2 w-full"
				>
					<option value="">Sort By</option>
					<option value="name">Name</option>
					<option value="date">Date</option>
					<option value="size">Size</option>
				</select>

				<div className="flex">
					<button
						onClick={() => setIsGridView(true)}
						className={`bg-background-2 text-secondary border border-secondary rounded-md p-2 ml-2 cursor-pointer ${
							isGridView ? "bg-background-3 text-secondary" : ""
						}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
							/>
						</svg>
					</button>
					<button
						onClick={() => setIsGridView(false)}
						className={`bg-background-2 text-secondary border border-secondary rounded-md p-2 ml-2 cursor-pointer ${
							!isGridView ? "bg-background-3 text-secondary" : ""
						}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 7h18M3 12h18M3 17h18"
							/>
						</svg>
					</button>
				</div>
			</div>

			{isGridView ? <TwoGrid /> : <OneGrid />}
		</main>
	);
}
