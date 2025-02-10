"use client";
import Link from "next/link";
import { InstallCommand } from "../components/InstallCommand/InstallCommand";
import { TestimonialCarousel } from "../components/TestimonialCarousel/TestimonialCarousel";
import { Href } from "../utils/routes/routes";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-6">
			<section className="w-full">
				<div className="gradient-border">
					<div className="gradient-border-inner p-8">
						<div className="flex flex-col items-start space-y-4">
							<div className="relative isolate overflow-hidden rounded-full bg-white dark:bg-slate-900 px-5 py-2 w-fit">
								<div className="absolute inset-[-50%] opacity-90 animate-rotate animate-borderWidth bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300"></div>
								<div className="absolute inset-[2px] rounded-full bg-inherit z-1"></div>
								<span className="relative z-2 text-blue-500 dark:text-blue-400 font-medium">nanoplot.js</span>
							</div>
							<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-white">
								<span className="text-blue-500 dark:text-blue-400">The last graph library you'll ever need</span>
							</h1>
							<p className="text-gray-600 dark:text-gray-300 md:text-xl">
								Create stunning data visualizations with ease. Perfect for developers, data scientists, and analysts.
							</p>
							<div className="space-x-4">
								<Link
									href={Href.PIE}
									className="inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none"
								>
									Get Started
								</Link>
								<Link
									href={Href.PIE}
									className="inline-flex h-11 items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 px-8 text-sm font-medium text-gray-900 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
								>
									Documentation
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full py-12">
				<div className="container mx-auto">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="flex flex-col items-start space-y-4  p-6 rounded-2xl border light:border-gray-200 dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm">
							<div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl">
								<svg
									className="w-8 h-8 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Interactive Charts</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Create dynamic, interactive visualizations that bring your data to life.
							</p>
						</div>
						<div className="flex flex-col items-start space-y-4  p-6 rounded-2xl border light:border-gray-200 dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm">
							<div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl">
								<svg
									className="w-8 h-8 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Real-time Updates</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Watch your visualizations update in real-time as your data changes.
							</p>
						</div>
						<div className="flex flex-col items-start space-y-4  p-6 rounded-2xl border light:border-gray-200 dark:border-gray-800  dark:bg-gray-900/50 backdrop-blur-sm">
							<div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl">
								<svg
									className="w-8 h-8 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Customizable</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Fully customizable charts and graphs to match your brand and needs.
							</p>
						</div>
						<div className="flex flex-col items-start space-y-4  p-6 rounded-2xl border light:border-gray-200 dark:border-gray-800  dark:bg-gray-900/50 backdrop-blur-sm">
							<div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl">
								<svg
									className="w-8 h-8 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Customizable</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Fully customizable charts and graphs to match your brand and needs.
							</p>
						</div>
						<div className="flex flex-col items-start space-y-4  p-6 rounded-2xl border light:border-gray-200 dark:border-gray-800  dark:bg-gray-900/50 backdrop-blur-sm">
							<div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl">
								<svg
									className="w-8 h-8 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Customizable</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Fully customizable charts and graphs to match your brand and needs.
							</p>
						</div>
						<div className="flex flex-col items-start space-y-4  p-6 rounded-2xl border light:border-gray-200 dark:border-gray-800  dark:bg-gray-900/50 backdrop-blur-sm">
							<div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl">
								<svg
									className="w-8 h-8 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Customizable</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Fully customizable charts and graphs to match your brand and needs.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full py-12">
				<TestimonialCarousel />
			</section>
			<section className="w-full py-12" id="getstarted">
				<div className="container mx-auto text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Get Started</h2>
					<div className="max-w-3xl mx-auto">
						<InstallCommand />
						<Link
							href={Href.PIE}
							className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
						>
							View Documentation
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
