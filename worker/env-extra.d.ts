// Augment the generated Cloudflare Env interface with additional vars.
// Run `pnpm worker:types` after updating wrangler.jsonc vars to regenerate worker-configuration.d.ts.
declare namespace Cloudflare {
	interface Env {
		POSTHOG_PROJECT_TOKEN: string
	}
}
