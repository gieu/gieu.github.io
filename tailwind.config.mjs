/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: {
				"main-pattern": "linear-gradient(0deg, rgba(18, 18, 18, 0.40) 0%, rgba(18, 18, 18, 0.40) 100%), linear-gradient(90deg, rgba(22, 22, 22, 0.60) 0%, rgba(0, 0, 0, 0.00) 100%), url('patterns/bg.jpg')"
			},
			colors: {
				Shiraz: {
					50: "#fef2f2",
					100: "#fef2f2",
					200: "#f9d2d2",
					300: "#f4adad",
					400: "#ed7f82",
					500: "#e25158",
					600: "#ce3040",
					DEFAULT: "a32131",
					700: "#a32131",
					800: "#912031",
					900: "#7c1f30",
					950: "#450c15"
				},
				daisy_bush: {
					50: "#f5f3ff",
					100: "#ede9fe",
					200: "#dcd6fe",
					300: "#c3b6fc",
					400: "#a58cf9",
					500: "#895df5",
					600: "#793bec",
					700: "#6a29d8",
					800: "#5922b5",
					900: "#5221a3",
					950: "#2d1164",
				},
				cod_gray: {
					50: "#f6f6f6",
					100: "#e7e7e7",
					200: "#d1d1d1",
					300: "#b0b0b0",
					400: "#888888",
					500: "#6d6d6d",
					600: "#5d5d5d",
					700: "#4f4f4f",
					800: "#454545",
					900: "#3d3d3d",
					950: "#121212",
				}
			},
		},

	},
	plugins: [],
}
