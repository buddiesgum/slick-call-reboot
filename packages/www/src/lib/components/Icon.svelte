<!--
	Drop-in wrapper for the icon registry.
	Usage: <Icon name="Hammer" class="size-6" />
-->
<script lang="ts">
	import type { LucideProps } from "@lucide/svelte"
	import { getIcon, type IconName } from "$lib/icons"

	let { name, ...rest }: { name: IconName | undefined } & LucideProps = $props()

	const Cmp = $derived(getIcon(name))
</script>

<Cmp {...rest} />
