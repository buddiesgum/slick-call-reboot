import * as v from "valibot"

export const careerSchema = v.object({
	firstName: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1, "First name is required"),
		v.maxLength(60)
	),
	lastName: v.pipe(v.string(), v.trim(), v.minLength(1, "Last name is required"), v.maxLength(60)),
	email: v.pipe(v.string(), v.trim(), v.email("Invalid email"), v.maxLength(160)),
	message: v.pipe(v.string(), v.trim(), v.minLength(1, "Message is required"), v.maxLength(2000)),
	updates: v.optional(v.boolean()),
	resume: v.optional(v.file())
})

export type CareerFormValues = v.InferOutput<typeof careerSchema>

/**
 * Max resume upload size (4 MB). Vercel serverless functions reject request
 * bodies over 4.5 MB, so the cap must stay comfortably below that.
 */
export const MAX_RESUME_BYTES = 4 * 1024 * 1024

/** MIME types accepted for resume uploads. */
export const ALLOWED_RESUME_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]

/**
 * File extensions accepted for resume uploads. Used as a fallback when the
 * browser cannot determine a reliable MIME type (e.g. iCloud Drive on Safari,
 * Google Docs downloads, some Linux MIME databases reporting application/zip
 * or application/octet-stream for .docx files).
 */
export const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"]

export type ResumeValidationError = "size" | "type" | "empty"

export const RESUME_ERROR_MESSAGES: Record<ResumeValidationError, string> = {
	size: "Resume must be 4 MB or smaller",
	type: "Resume must be a PDF, DOC, or DOCX file",
	empty: "Resume file is empty"
}

/**
 * Validates a resume File on size and MIME type. Usable on both client and server.
 * Returns null when the file is valid, or a reason string when it is not.
 *
 * Type check passes when either:
 *   - `file.type` is in ALLOWED_RESUME_TYPES, OR
 *   - the filename ends with an extension in ALLOWED_RESUME_EXTENSIONS
 */
export function validateResumeFile(file: File): ResumeValidationError | null {
	if (file.size === 0) return "empty"
	if (file.size > MAX_RESUME_BYTES) return "size"
	const matchesMime = ALLOWED_RESUME_TYPES.includes(file.type)
	const matchesExt = ALLOWED_RESUME_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext))
	if (!matchesMime && !matchesExt) return "type"
	return null
}
