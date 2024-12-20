import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Header() {
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
						<Link href="/account">
							<Button className="bg-primary text-primary-foreground" variant="ghost">
								Account
							</Button>
						</Link>
					</div>
				</div>
			</header>
			{/* <div className="md: mt-5" /> */}
		</>
	);
}
