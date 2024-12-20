import LensMain from "@/components/lens/lensMain";

export default function Home() {
	/* @ts-expect-error Async Server Component */
	return <LensMain />;
}
