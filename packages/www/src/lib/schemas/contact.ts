import * as v from "valibot"

export const contactSchema = v.object({
	firstName: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1, "First name is required"),
		v.maxLength(60)
	),
	lastName: v.pipe(v.string(), v.trim(), v.minLength(1, "Last name is required"), v.maxLength(60)),
	phone: v.pipe(v.string(), v.trim(), v.minLength(7, "Valid phone required"), v.maxLength(20)),
	email: v.pipe(v.string(), v.trim(), v.email("Invalid email"), v.maxLength(160)),
	propertyType: v.pipe(
		v.optional(v.string(), ""),
		v.picklist(["residential", "commercial"], "Select property type")
	),
	service: v.pipe(v.string(), v.trim(), v.minLength(1, "Select a service")),
	message: v.pipe(v.string(), v.trim(), v.minLength(1, "Message is required"), v.maxLength(1000)),
	financing: v.optional(v.boolean())
})

export type ContactFormValues = v.InferOutput<typeof contactSchema>
