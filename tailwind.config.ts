import typography from "@tailwindcss/typography";
import daisyui, { type Config as DaisyUIConfig } from "daisyui";
import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {},
	},
	plugins: [typography, daisyui],
	daisyui: {
		logs: false,
		themes: ["cupcake"],
	} satisfies DaisyUIConfig,
} satisfies Config;
