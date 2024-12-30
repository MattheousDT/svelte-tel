<script lang="ts">
	import { Sveltel } from "$lib/index.js";

	type Props = {
		sveltel: Sveltel;
	};

	let { sveltel }: Props = $props();

	let input: HTMLInputElement;

	function getFlagEmoji(countryCode: string) {
		const codePoints = countryCode
			.toUpperCase()
			.split("")
			.map((char) => 127397 + char.charCodeAt(0));
		return String.fromCodePoint(...codePoints);
	}
</script>

<label class="form-control">
	<div class="sr-only">Phone number</div>
	<div class="join">
		<select
			bind:value={sveltel.country}
			onchange={() => input?.focus()}
			class="join-item select select-bordered select-lg max-w-[calc(1ch+4.5rem)]"
		>
			<option value={null} disabled>❓️ Select country</option>
			{#each sveltel.countries as country}
				<option value={country.code} selected={country.code === sveltel.country}>
					{getFlagEmoji(country.code)}
					{country.name}
				</option>
			{/each}
		</select>
		<input
			bind:this={input}
			type="tel"
			bind:value={sveltel.value}
			class="input input-lg join-item input-bordered w-full"
		/>
	</div>
</label>
