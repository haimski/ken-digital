import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                rubik: ['Rubik', 'sans-serif'],
            },
            colors: {
                darkgray: "#676767",
                'red-brand-color': '#d70d0e',
                'blue-brand-color': '#324681',
            },
        },
    },
    plugins: [],
};

export default config;