import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const ALLOWED_ORIGINS = new Set([
	"https://2-19-8-sandpack.codesandbox.io",
	"https://www.nanoplot.com",
	"https://nanoplot.com",
]);

const MIME: Record<string, string> = {
	js: "application/javascript",
	css: "text/css",
};

const VALID_FILES = new Set([
	"sandpack.js",
	"sandpack-dark.js",
	"sandpack-light.js",
	"sandpack-dark-global.css",
	"sandpack-light-global.css",
]);

function corsHeaders(origin: string): Record<string, string> {
	const allowed = ALLOWED_ORIGINS.has(origin) || origin.startsWith("http://localhost:");
	if (!allowed) return {};
	return {
		"Access-Control-Allow-Origin": origin,
		"Access-Control-Allow-Private-Network": "true",
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Access-Control-Allow-Headers": "*",
	};
}

export async function OPTIONS(request: NextRequest) {
	const origin = request.headers.get("origin") ?? "";
	return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
	const { path } = await params;
	const origin = request.headers.get("origin") ?? "";
	const fileName = path.join("/");

	if (!VALID_FILES.has(fileName)) {
		return new NextResponse("Not found", { status: 404 });
	}

	try {
		const content = await readFile(join(process.cwd(), "public", "sandpack", fileName), "utf-8");
		const ext = fileName.split(".").pop() ?? "";
		return new NextResponse(content, {
			headers: {
				"Content-Type": MIME[ext] ?? "application/octet-stream",
				"Cache-Control": "public, max-age=31536000, immutable",
				...corsHeaders(origin),
			},
		});
	} catch {
		return new NextResponse("Not found", { status: 404 });
	}
}
