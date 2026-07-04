import { defineEnvVars } from "@sveltejs/kit/hooks"
import * as v from "valibot"

const requiredString = v.pipe(v.string(), v.minLength(1))
const requiredUrl = v.pipe(v.string(), v.url())

export const variables = defineEnvVars({
	PUBLIC_POSTHOG_PROJECT_TOKEN: {
		public: true,
		static: true,
		schema: requiredString,
		description: "PostHog project token (required; build fails when unset)"
	},
	PUBLIC_POSTHOG_HOST: {
		public: true,
		static: true,
		schema: requiredUrl,
		description: "PostHog ingestion host, e.g. https://us.i.posthog.com (required)"
	},
	RESEND_API_KEY: {
		static: true,
		description: "Resend API key for the transactional email REST API"
	}
})
