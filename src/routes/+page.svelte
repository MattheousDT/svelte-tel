<script lang="ts">
	import { Tel } from "$lib/index.js";

	let input: HTMLInputElement;

	const tel = new Tel({
		defaultCountry: "GB",
	});

	function getFlagEmoji(countryCode: string) {
		const codePoints = countryCode
			.toUpperCase()
			.split("")
			.map((char) => 127397 + char.charCodeAt(0));
		return String.fromCodePoint(...codePoints);
	}
</script>

<header class="mb-8 rounded-box bg-base-200 p-8">
	<h1 class="my-0">svelte-tel</h1>
	<p class="my-0">Simple, headless phone number formatting for Svelte.</p>
</header>

<label class="form-control">
	<div class="sr-only">Phone number</div>
	<div class="join" lang={tel.locale?.toString()} dir={tel.locale === "ar" ? "rtl" : "ltr"}>
		<select
			bind:value={tel.country}
			onchange={() => input?.focus()}
			style:--code-length={(tel.hideCallingCode ? (tel.countryCallingCode ?? "").length + 1 : 0) +
				"ch"}
			class={[
				"join-item select select-bordered select-lg",
				tel.hideCallingCode && tel.format === "international"
					? "max-w-[calc(var(--code-length)+1ch+4.5rem)]"
					: "max-w-[calc(1ch+4.5rem)]",
				tel.valid && "select-success",
			]}
		>
			<option value={null}>🌍️ Select country</option>
			{#each tel.countries as country}
				{@const selected = country.code === tel.country}
				<option value={country.code} {selected}>
					{getFlagEmoji(country.code)}
					{tel.hideCallingCode && tel.format === "international"
						? `+${country.callingCode}`
						: country.name}
				</option>
			{/each}
		</select>
		<input
			bind:this={input}
			{...tel.props}
			class={["input input-lg join-item input-bordered w-full", tel.valid && "input-success"]}
		/>
	</div>
</label>

<fieldset>
	<legend> Format </legend>

	<label class="flex items-center gap-2">
		<input type="radio" bind:group={tel.format} value="international" class="radio" />
		International
	</label>

	<label class="flex items-center gap-2">
		<input type="radio" bind:group={tel.format} value="national" class="radio" />
		National
	</label>
</fieldset>

<label class="flex items-center gap-2">
	<input type="checkbox" bind:checked={tel.hideCallingCode} class="checkbox" />
	Hide calling code
</label>

<fieldset>
	<legend>Locale</legend>

	<!-- English, Spanish, Korean, Arabic -->
	<label class="flex items-center gap-2">
		<input type="radio" bind:group={tel.locale} value="en" class="radio" />
		English
	</label>

	<label class="flex items-center gap-2">
		<input type="radio" bind:group={tel.locale} value="es" class="radio" />
		Spanish
	</label>

	<label class="flex items-center gap-2">
		<input type="radio" bind:group={tel.locale} value="ko" class="radio" />
		Korean
	</label>

	<label class="flex items-center gap-2">
		<input type="radio" bind:group={tel.locale} value="ar" class="radio" />
		Arabic
	</label>
</fieldset>

{#if tel.valid}
	<div class="alert alert-success mt-4">
		<p class="my-0">Valid phone number!</p>
	</div>
{:else if tel.possible}
	<div class="alert alert-warning mt-4">
		<p class="my-0">Possible phone number</p>
	</div>
{:else}
	<div class="alert alert-error mt-4">
		<p class="my-0">Invalid phone number.</p>
	</div>
{/if}

<p>
	International: {tel.international}
	<br />
	National: {tel.national}
	<br />
	Number: {tel.number}
</p>
