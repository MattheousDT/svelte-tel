<script lang="ts">
	import "../app.css";
	let { children } = $props();
</script>

<div class="prose-lg mx-auto w-full max-w-xl px-4 py-8 prose-headings:font-bold">
	{@render children()}
</div>
