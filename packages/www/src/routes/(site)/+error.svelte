<script lang="ts">
	import { page } from "$app/state"
</script>

<div class="flex min-h-screen items-center justify-center bg-muted">
	<div class="text-center">
		{#if page.status === 404}
			<h1 class="mb-4 text-4xl font-bold">404</h1>
			<p class="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
		{:else}
			<h1 class="mb-4 text-4xl font-bold">{page.status}</h1>
			<p class="mb-4 text-xl text-muted-foreground">
				{page.error?.message ?? "Something went wrong"}
			</p>
		{/if}
		<a href="/" class="text-primary underline hover:text-primary/90">Return to Home</a>
	</div>
</div>
