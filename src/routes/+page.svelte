<script lang="ts">
	import { Sveltel } from "$lib/index.js";

	let input: HTMLInputElement;

	let includeTerritories = $state(false);

	const tel = new Sveltel({
		defaultCountry: "GB",
		// svelte-ignore state_referenced_locally This is just to set the default value, we don't need to update in the constructor
		includeTerritories,
	});

	function getFlagEmoji(countryCode: string) {
		const codePoints = countryCode
			.toUpperCase()
			.split("")
			.map((char) => 127397 + char.charCodeAt(0));
		return String.fromCodePoint(...codePoints);
	}
</script>

<label for="">
	<input type="checkbox" bind:checked={tel.includeTerritories} class="checkbox" />
	Include territories
</label>

<label class="form-control">
	<div class="label-text">Phone number</div>
	<div class="join">
		<select
			name=""
			id=""
			bind:value={tel.country}
			onchange={() => input?.focus()}
			class="join-item select select-bordered select-lg max-w-[calc(1ch+4.5rem)]"
		>
			<option value={null} disabled>❓️ Select country</option>
			{#each tel.countries as country}
				<option value={country.code} selected={country.code === tel.country}>
					{getFlagEmoji(country.code)}
					{country.name}
				</option>
			{/each}
		</select>
		<input
			bind:this={input}
			type="tel"
			bind:value={tel.value}
			class="input input-lg join-item input-bordered"
		/>
	</div>
</label>

<table class="table table-zebra max-w-sm">
	<tbody>
		{#each Object.entries( { ...tel.countryData, value: tel.value, rawValue: tel.rawValue }, ) as [key, value] (key)}
			<tr>
				<th>{key}</th>
				<td class="text-end">
					{#if Array.isArray(value)}
						{new Intl.ListFormat().format(value)}
					{:else}
						{value}
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
