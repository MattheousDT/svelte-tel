# svelte-tel

Simple headless phone number input handling for Svelte.

[![View Demo](https://img.shields.io/badge/View%20Demo-blue)](https://mattheousdt.github.io/svelte-tel/)
[![npm](https://img.shields.io/npm/v/svelte-tel)](https://www.npmjs.com/package/svelte-tel)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/MattheousDT/svelte-tel/deploy.yml?branch=master)

> [!WARNING]
> This library is in alpha stages and may have breaking changes in the future.
>
> _(it definitely will)_

## Motivation and Goals

The library is fully headless, so you can use it however you want. All logic _should_ be handled by the library, and the UI to be handled by you. This way, you can have full control over the look and feel of your phone input. I also want to make it entirely based on Runes so you get the full power of Svelte.

Future things I'm considering:

- More options for the class.
- Pre-built components.

If you have any suggestions, feel free to open an issue and we can discuss it.

## Installation

```bash
npm install svelte-tel
```

## Usage

```svelte
<script>
  import { Tel } from "svelte-tel";

  // Initialize the class
  const tel = new Tel();
</script>

<!-- Bind the value to the input -->
<input type="tel" bind:value={tel.value} />

<!-- Now you can access the country data and the raw phone number -->

<p>Country Code: {tel.country}</p>
<p>Internationally formatted: {tel.value}</p>
<p>Nationally formatted: {tel.national}</p>
<p>Raw Phone Number: {tel.number}</p>
<p>Is Valid: {tel.valid}</p>
<p>Is Possible: {tel.possible}</p>
```

🎉 That's literally it 🎉

## More complex example

Now you can use `tel` to do whatever you want.
Here's an example of how you might create a phone input with a country selector.

```svelte
<script lang="ts">
  import { Tel } from "svelte-tel";
  import { getFlagEmoji } from "path-to-your-flag-emoji-function";

  let input: HTMLInputElement;

  const tel = new Tel({ defaultCountry: "GB" });
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
      <option value={null} disabled>🌍️ Select a country</option>
      {#each tel.countries as country}
        <option value={country.code}>
          {getFlagEmoji(country.code)}
          {country.name}
        </option>
      {/each}
    </select>
    <input bind:this={input} {...tel.props} />
  </div>
</label>
```

Still need more examples? [Check out the demo website](https://mattheousdt.github.io/svelte-tel/)

## Options

```svelte
<script>
  import { Tel } from "svelte-tel";

  const tel = new Tel({
    // Required if using national format
    defaultCountry: "GB",
    // The default value of the input
    defaultValue: "447123456789",
    // Language to use for translations
		locale: "en",
    // The format to use when formatting the phone number
		format: "international";
		// Whether to hide the country code prefix in the input
		hideCallingCode: false;
		// Whether the country code is editable when in international format
		editableCountryCode: true;
		// The countries to exclude from the countries list
		excludeCountries: ["US"];
		// The countries to include in the countries list
		includeCountries: ["GB", "IE"];
  });
</script>

<!-- All options are $state() runes, so you can bind or change them after initialization -->
<input type="checkbox" bind:checked={tel.hideCallingCode} />
```

## Contributing

I'm open to contributions, but I'm not sure how much more I want to add to this library. If you have a feature request, feel free to open an issue and we can discuss it. If you see a bug (most likely you will), please open an issue or a PR and I'll take a look.
