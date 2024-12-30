<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		source?: string;
	};

	let { children, source }: Props = $props();

	let viewingCode = $state(false);
</script>

{#if source}
	<div role="tablist" class="not-prose tabs-boxed tabs mb-2 w-max">
		<button
			role="tab"
			class={["tab", !viewingCode && "tab-active"]}
			onclick={() => (viewingCode = false)}
		>
			Preview
		</button>
		<button
			role="tab"
			class={["tab", viewingCode && "tab-active"]}
			onclick={() => (viewingCode = true)}
		>
			Code
		</button>
	</div>
{/if}

<div class="not-prose mockup-window border bg-base-300">
	<div class="w-full bg-base-200 p-8">
		{#if viewingCode && source}
			<pre class="text-sm">{source}</pre>
		{:else}
			{@render children()}
		{/if}
	</div>
</div>
