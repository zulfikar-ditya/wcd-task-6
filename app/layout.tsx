import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Layouts/Navbar";
import ReduxProvider from "./redux/provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Pokemon App",
	description: "Pokemon card application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased container max-w-md mx-auto`}
			>
				<ReduxProvider>
					<Navbar />
					<div className="container mx-auto px-4">{children}</div>
				</ReduxProvider>
			</body>
		</html>
	);
}
