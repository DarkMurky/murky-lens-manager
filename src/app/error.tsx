"use client";
import { useEffect } from "react";

// biome-ignore lint/suspicious/noShadowRestrictedNames: NextJS naming convention for error
export default function Error({ error }: { error: Error }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex items-center justify-center h-main-content">
			<div className="flex items-center justify-center">
				<div className="text-destructive text-2xl font-bold tracking-tight lg:text-3xl">Could not fetch lenses!</div>
			</div>
		</div>
	);
}
