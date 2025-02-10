"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
	{
		initials: "JD",
		name: "John Doe",
		role: "Senior Developer at TechCorp",
		text: "Nanoplot has completely transformed how we visualize data. The real-time updates and customization options are exactly what we needed. It's become an essential part of our analytics dashboard.",
	},
	{
		initials: "AS",
		name: "Alice Smith",
		role: "Data Scientist at DataViz",
		text: "The ease of implementation and the beautiful default styles made Nanoplot an obvious choice for our team. The documentation is clear and the API is intuitive.",
	},
	{
		initials: "RJ",
		name: "Robert Johnson",
		role: "Lead Engineer at StartupX",
		text: "Performance was our main concern, and Nanoplot delivered. Even with large datasets, the charts remain smooth and responsive. The optimization features are impressive.",
	},
	{
		initials: "EW",
		name: "Emma Wilson",
		role: "Frontend Developer at DesignCo",
		text: "The customization options in Nanoplot are unmatched. We were able to perfectly match our brand's aesthetic while maintaining the functionality we needed.",
	},
];

export const TestimonialCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setDirection(1);
			setCurrentIndex((prev) => (prev + 1) % testimonials.length);
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		}),
	};

	const swipeConfidenceThreshold = 10000;
	const swipePower = (offset: number, velocity: number) => {
		return Math.abs(offset) * velocity;
	};

	const paginate = (newDirection: number) => {
		setDirection(newDirection);
		setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
	};

	return (
		<div className="relative w-full overflow-hidden">
			<div className="container mx-auto">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">What developers are saying</h2>
				<div className="relative h-[172px]">
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={currentIndex}
							custom={direction}
							variants={slideVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: "spring", stiffness: 300, damping: 30 },
								opacity: { duration: 0.2 },
							}}
							drag="x"
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={1}
							onDragEnd={(e, { offset, velocity }) => {
								const swipe = swipePower(offset.x, velocity.x);

								if (swipe < -swipeConfidenceThreshold) {
									paginate(1);
								} else if (swipe > swipeConfidenceThreshold) {
									paginate(-1);
								}
							}}
							className="absolute w-full"
						>
							<div className="p-6 mx-auto max-w-3xl rounded-2xl border light:border-gray-200 dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm">
								<div className="flex items-center gap-4 mb-4">
									<div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
										<span className="text-blue-600 dark:text-blue-400 text-lg font-semibold">
											{testimonials[currentIndex].initials}
										</span>
									</div>
									<div>
										<h3 className="font-semibold text-gray-900 dark:text-white">{testimonials[currentIndex].name}</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</p>
									</div>
								</div>
								<p className="text-gray-600 dark:text-gray-400">"{testimonials[currentIndex].text}"</p>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
				<div className="flex justify-center gap-2 mt-6">
					{testimonials.map((_, index) => (
						<button
							key={index}
							onClick={() => {
								setDirection(index > currentIndex ? 1 : -1);
								setCurrentIndex(index);
							}}
							className={`w-2 h-2 rounded-full transition-colors duration-200 ${
								index === currentIndex ? "bg-blue-500 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-700"
							}`}
							aria-label={`Go to testimonial ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
