import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-primary text-primary-foreground flex flex-col justify-around items-center p-1 fixed left-0 bottom-0 w-full h-footer sm:items-start">
			<h1 className="scroll-m-20 text-sm font-bold tracking-tight sm:pl-4">Made by: DarkMurky</h1>
			<div>
				<div className="flex h-5 items-center text-sm space-x-4 ">
					<Link href="/about">
						<Button className="bg-primary text-primary-foreground" variant="ghost">
							About
						</Button>
					</Link>
					<Separator orientation="vertical" />
					<Link href="/github">
						<Button className="bg-primary text-primary-foreground" variant="ghost">
							GitHub
						</Button>
					</Link>
				</div>
			</div>
		</footer>
	);
}
