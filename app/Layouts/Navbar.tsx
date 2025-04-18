"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="flex items-center justify-between p-4 text-white border-b border-gray-200">
			<div className="">
				<Link href="/" className="text-lg font-bold">
					<Image
						src="/images/logo/logo.png"
						alt="Logo"
						className="w-full h-[35px] mr-2"
						width={100}
						height={100}
					/>
				</Link>
			</div>
			<div className="flex items-center relative">
				<input
					id="searchInput"
					type="text"
					placeholder="Search..."
					className="mt-1 px-3 py-1 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition duration-200 ease-in-out"
					style={{ display: "none" }}
				/>
				<button
					onClick={() => {
						const searchInput = document.getElementById("searchInput");
						if (searchInput) {
							searchInput.style.display =
								searchInput.style.display === "none" ? "block" : "none";
							if (searchInput.style.display === "block") {
								searchInput.focus();
							}
						}
					}}
					className="p-2"
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
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
		</nav>
	);
}
