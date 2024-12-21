import Loader from "@/components/loading";

export default function Loading() {
	return (
		<div className="flex items-center justify-center h-main-content">
			<div className="text-2xl text-primary">
				<Loader />
			</div>
		</div>
	);
}
