"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import { logoutAction } from "@/actions/authActions";
import { DEFAULT_REDIRECT } from "@/constants/routes";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

export default function Header() {
	const { toast } = useToast();

	const [authToken, setAuthToken] = useState(Cookies.get("authenticated"));
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Needs authToken in dependencies to correctly update auth status
	useEffect(() => {
		setIsAuthenticated(sessionCookie === "true");
	}, [authToken]);

	const sessionCookie = Cookies.get("authenticated");
	if (authToken !== sessionCookie) {
		setAuthToken(sessionCookie);
	}

	const logoutUser = async () => {
		const data = await logoutAction();
		toast({
			title: data.message,
		});

		const deleteCookie = (name: string) => {
			document.cookie = `${name}=; Max-Age=0; path=/`;
		};

		deleteCookie("authenticated");

		if (data.success) {
			setIsAuthenticated(false);
			redirect(DEFAULT_REDIRECT);
		}
	};

	return (
		<>
			<header className="bg-primary text-primary-foreground flex flex-col justify-around items-center p-1 h-header sm:flex-row sm:justify-between sm:p-3 md:h-header-md">
				<Link href="/">
					<h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">Murky Lens</h1>
				</Link>
				<div>
					<div className="flex h-5 items-center space-x-4 text-sm">
						<Link href="/about">
							<Button className="bg-primary text-primary-foreground" variant="ghost">
								About
							</Button>
						</Link>
						<Separator orientation="vertical" />
						{isAuthenticated ? (
							<Button onClick={() => logoutUser()} className="bg-primary text-primary-foreground" variant="ghost">
								Log out
							</Button>
						) : (
							<Link href="/login">
								<Button className="bg-primary text-primary-foreground" variant="ghost">
									Login
								</Button>
							</Link>
						)}
					</div>
				</div>
			</header>
		</>
	);
}
