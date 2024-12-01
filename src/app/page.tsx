"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/routes/routes";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		/* Homepage pending, so just redirect so dev experience is better. */
		router.push(Routes.PIE_GRAPH);
	}, []);
	return <div />;
}
