import { z } from "zod"

export const contactSchema = z.object({
	firstName: z.string().trim().min(1, "First name is required").max(60),
	lastName: z.string().trim().min(1, "Last name is required").max(60),
	phone: z.string().trim().min(7, "Valid phone required").max(20),
	email: z.string().trim().email("Invalid email").max(160),
	propertyType: z.enum(["residential", "commercial"], {
		errorMap: () => ({ message: "Select property type" })
	}),
	service: z.string().trim().min(1, "Select a service"),
	message: z.string().trim().min(1, "Message is required").max(1000),
	financing: z.boolean().optional()
})

export type ContactFormValues = z.infer<typeof contactSchema>

export type ContactFormState = {
	firstName: string
	lastName: string
	phone: string
	email: string
	propertyType: "residential" | "commercial" | ""
	service: string
	message: string
	financing: boolean
}

export const initialContactForm: ContactFormState = {
	firstName: "",
	lastName: "",
	phone: "",
	email: "",
	propertyType: "",
	service: "",
	message: "",
	financing: false
}
