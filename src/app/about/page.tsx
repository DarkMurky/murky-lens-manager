import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GITHUB_REPOSITORY } from "@/constants/routes";
import Link from "next/link";

export default function About() {
	return (
		<div className="page-container">
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl font-bold mb-4">About Our Project</CardTitle>
					<CardDescription className="text-lg text-gray-600">
						A modern Web UI to manage your applications.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4 text-gray-700">
						<p>
							With this Web UI, you can manage all your loose web applications in one spot. Name them, add descriptions,
							assign icons, and launch them effortlessly.
						</p>
						<p>
							This platform is built with modern technologies to ensure a seamless experience. It uses Next.js for fast
							and scalable server-side rendering, Tailwind CSS for a clean and responsive design, and JWT authentication
							to keep your data secure and your sessions reliable.
						</p>
						<p>
							Source code can be found at this{" "}
							<strong>
								<Link href={GITHUB_REPOSITORY} target="_blank">
									Github repository
								</Link>
							</strong>
							.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
