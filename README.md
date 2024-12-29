# Sveltel

Simple headless phone number input handling for Svelte.

[![View Demo](https://img.shields.io/badge/View%20Demo-blue)](https://mattheousdt.github.io/sveltel/)
[![npm](https://img.shields.io/npm/v/sveltel)](https://www.npmjs.com/package/sveltel)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/MattheousDT/sveltel/deploy.yml?branch=master)

## Motivation

I needed a library that would perform some basic frontend formatting of phone numbers (properly validated on the backend) but I didn't want to have to ship a massive library like `libphonenumber-js` to the client just for this luxury. Proper validation can be performed on the backend, so I just needed something that would format the phone number as the user typed it. The library is fully headless, so you can use it however you want. In the future I may add some components that use the library, but for now it's just a simple class.

## Installation

```bash
npm install sveltel
```

## Usage

```svelte
<script>
	import { Sveltel } from "sveltel";

	// Initialize the class
	const tel = new Sveltel();
</script>

<!-- Bind the value to the input -->
<input type="tel" bind:value={tel.value} />

<!-- Now you can access the country data and the raw phone number -->

<p>Country: {tel.countryData.name}</p>
<p>Country Code: {tel.countryData.code}</p>
<p>Phone Number: {tel.value}</p>
<p>Raw Phone Number: {tel.rawValue}</p>
```

🎉 That's literally it 🎉

## More complex example

Now you can use `tel` to do whatever you want.
Here's an example of how you might create a phone input with a country selector.

```svelte
<script lang="ts">
	import { Sveltel } from "sveltel";
	import { getFlagEmoji } from "path-to-your-flag-emoji-function";

	let input: HTMLInputElement;

	const tel = new Sveltel({ defaultCountry: "gb" });
</script>

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
</label>
```

Still need more examples? [Check out the demo website](https://mattheousdt.github.io/sveltel/)

## Options

```svelte
<script>
	import { Sveltel } from "sveltel";

	const tel = new Sveltel({
		// Default data
		defaultCountry: "US",
		// Note: defaultValue takes precedence over the defaultCountry
		defaultValue: "1234567890",

		// Exclude countries/regions
		excludeCountries: ["CA", "MX"],
		excludeRegions: ["africa"],
		excludeSubregions: ["eu"],

		// Include territories like Jersey, Cayman Islands, etc.
		includeTerritories: true,
	});
</script>

<!-- All options are $state() runes, so you can bind or change them after initialization -->
<input type="checkbox" bind:checked={tel.includeTerritories} />
```

## Contributing

I'm open to contributions, but I'm not sure how much more I want to add to this library. If you have a feature request, feel free to open an issue and we can discuss it. If you see a bug (most likely you will), please open an issue or a PR and I'll take a look.
