import { contactSchema } from "@/lib/schemas/contact"

export async function handleContact(request: Request): Promise<Response> {
	if (!request.headers.get("content-type")?.includes("application/json")) {
		return Response.json({ ok: false, error: "Unsupported Media Type" }, { status: 415 })
	}

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
	}

	const result = contactSchema.safeParse(body)
	if (!result.success) {
		return Response.json({ ok: false, errors: result.error.flatten() }, { status: 400 })
	}

	// TODO: wire submission destination (Resend, MailChannels, webhook, etc.)
	console.log("contact submission", JSON.stringify(result.data))

	return Response.json({ ok: true })
}
