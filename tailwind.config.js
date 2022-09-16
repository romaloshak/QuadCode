/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#253F4B',
				primary_dark: '#223A45',
				text: {
					disabled: '#D0D0D0',
					blue: '#3E65BE',
					light_blue: '#7EA4E7',
				},
			},
			fontFamily: {
				rubik: 'Rubik',
			},
			content: {
				'arrow-down': 'url("src/Assets/icons/arrow-down.svg")',
			},
		},
	},
	plugins: [],
};
