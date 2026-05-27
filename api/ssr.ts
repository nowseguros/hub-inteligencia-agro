// @ts-expect-error — arquivo gerado em build time, sem tipos
import server from "../dist/server/server.js";

type FetchServer = { fetch: (request: Request) => Promise<Response> };

export default function handler(request: Request): Promise<Response> {
	return (server as FetchServer).fetch(request);
}
