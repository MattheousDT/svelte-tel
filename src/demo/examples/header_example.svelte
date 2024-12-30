<script>
	import { Tel } from "$lib/tel.svelte.js";
	import Example from "../example.svelte";
	import SveltelComponent from "../sveltel_component.svelte";

	const tel = new Tel({
		defaultValue: "11234567890",
	});

	const source = `\<script lang="ts"\>
	import { Tel } from "svelte-tel";
	import { getFlagEmoji } from "path-to-your-flag-emoji-function";

	let input: HTMLInputElement;

	const tel = new Tel({ defaultCountry: "gb" });
\</script\>

<label>
	Phone number
	<div>
		<select
			bind:value={tel.country}
			onchange={() => {
				// Focus the input when the country is selected
				input?.focus();
			}}
		>
			<option value={null} disabled>❓️ Select a country</option>
			{#each tel.countries as country}
				<option value={country.code}>
					{getFlagEmoji(country.code)}
					{country.name}
				</option>
			{/each}
		</select>
		<input type="tel" bind:this={input} bind:value={tel.value} />
	</div>
</label>`;
</script>

<Example {source}>
	<SveltelComponent {tel} />
</Example>
