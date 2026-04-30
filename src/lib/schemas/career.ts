import { z } from "zod"

export const careerSchema = z.object({
	firstName: z.string().trim().min(1, "First name is required").max(60),
	lastName: z.string().trim().min(1, "Last name is required").max(60),
	email: z.string().trim().email("Invalid email").max(160),
	message: z.string().trim().min(1, "Message is required").max(2000),
	updates: z.boolean().optional(),
	// Resume file is not uploaded in this phase — flag only.
	// TODO: swap to multipart + R2 upload once storage is configured.
	hasResume: z.boolean().optional()
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
