import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Lens Manager",
	description: "App which helps you manage your web applications",
  
	icons: {
	  icon: [
		{
		  rel: "icon",
		  type: "image/ico",
		  url: "/favicon/favicon.ico",
		},
		{
		  rel: "icon",
		  type: "image/png",
		  sizes: "16x16",
		  url: "/favicon/favicon-16x16.png",
		},
		{
		  rel: "icon",
		  type: "image/png",
		  sizes: "32x32",
		  url: "/favicon/favicon-32x32.png",
		},
		{
		  rel: "icon",
		  type: "image/png",
		  sizes: "192x192",
		  url: "/favicon/android-chrome-192x192.png",
		},
		{
		  rel: "icon",
		  type: "image/png",
		  sizes: "512x512",
		  url: "/favicon/android-chrome-512x512.png",
		},
	  ],
	},
  
	manifest: "/favicon/site.webmanifest",
  };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Header />
				{children}
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
