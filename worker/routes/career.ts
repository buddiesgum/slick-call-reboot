import { careerSchema } from "@/lib/schemas/career"

export async function handleCareer(request: Request): Promise<Response> {
	if (!request.headers.get("content-type")?.includes("application/json")) {
		return Response.json({ ok: false, error: "Unsupported Media Type" }, { status: 415 })
	}

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
	}

	const result = careerSchema.safeParse(body)
	if (!result.success) {
		return Response.json({ ok: false, errors: result.error.flatten() }, { status: 400 })
	}

	// TODO: wire submission destination (Resend, MailChannels, webhook, etc.)
	// TODO: add resume file upload once R2 or email provider is configured
	console.log("career application", JSON.stringify(result.data))

	return Response.json({ ok: true })
}
