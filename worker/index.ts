import { handleContact } from "./routes/contact"
import { handleCareer } from "./routes/career"

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const { pathname } = new URL(request.url)

		try {
			switch (pathname) {
				case "/api/contact":
					if (request.method !== "POST") {
						return Response.json(
							{ ok: false, error: "Method Not Allowed" },
							{ status: 405, headers: { Allow: "POST" } }
						)
					}
					return await handleContact(request)

				case "/api/career":
					if (request.method !== "POST") {
						return Response.json(
							{ ok: false, error: "Method Not Allowed" },
							{ status: 405, headers: { Allow: "POST" } }
						)
					}
					return await handleCareer(request)

				default:
					return env.ASSETS.fetch(request)
			}
		} catch (err) {
			console.error("Worker unhandled error:", err)
			return Response.json({ ok: false, error: "Internal Server Error" }, { status: 500 })
		}
	}
}
