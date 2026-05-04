import { z } from "zod"

export const careerSchema = z.object({
	firstName: z.string().trim().min(1, "First name is required").max(60),
	lastName: z.string().trim().min(1, "Last name is required").max(60),
	email: z.string().trim().email("Invalid email").max(160),
	message: z.string().trim().min(1, "Message is required").max(2000),
	updates: z.boolean().optional()
})

export type CareerFormValues = z.infer<typeof careerSchema>

export type CareerFormState = {
	firstName: string
	lastName: string
	email: string
	message: string
	updates: boolean
}

export const initialCareerForm: CareerFormState = {
	firstName: "",
	lastName: "",
	email: "",
	message: "",
	updates: false
}

/** Max resume upload size (5 MiB). */
export const MAX_RESUME_BYTES = 5 * 1024 * 1024

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

/**
 * Validates a resume File on size and MIME type. Usable on both client and worker.
 * Returns null when the file is valid, or a reason string when it is not.
 *
 * Type check passes when either:
 *   - `file.type` is in ALLOWED_RESUME_TYPES, OR
 *   - the filename ends with an extension in ALLOWED_RESUME_EXTENSIONS
 *
 * This handles browsers/OSes that cannot reliably determine MIME types for
 * .doc/.docx files. Both checks must fail to reject the file.
 */
export function validateResumeFile(file: File): ResumeValidationError | null {
	if (file.size === 0) return "empty"
	if (file.size > MAX_RESUME_BYTES) return "size"
	const matchesMime = ALLOWED_RESUME_TYPES.includes(file.type)
	const matchesExt = ALLOWED_RESUME_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext))
	if (!matchesMime && !matchesExt) return "type"
	return null
}
