import type { IncomingMessage, ServerResponse } from "node:http";

// dist/server/server.js é gerado em build time
const server = await import("../dist/server/server.js");

export default async function handler(
	req: IncomingMessage,
	res: ServerResponse,
): Promise<void> {
	const url = `https://${req.headers.host}${req.url}`;

	const headers = new Headers();
	for (const [key, value] of Object.entries(req.headers)) {
		if (value) headers.set(key, Array.isArray(value) ? value.join(",") : value);
	}

	const hasBody = req.method !== "GET" && req.method !== "HEAD";
	const body = hasBody
		? await new Promise<Buffer>((resolve) => {
				const chunks: Buffer[] = [];
				req.on("data", (chunk) => chunks.push(chunk));
				req.on("end", () => resolve(Buffer.concat(chunks)));
			})
		: undefined;

	const request = new Request(url, {
		method: req.method,
		headers,
		body: body ?? null,
	});

	const response = await server.default.fetch(request);

	res.statusCode = response.status;
	response.headers.forEach((value, key) => { res.setHeader(key, value); });
	const buffer = await response.arrayBuffer();
	res.end(Buffer.from(buffer));
}
