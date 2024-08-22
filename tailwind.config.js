/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            width: {
                240: '240px',
            },
            colors: {
                gray: {
                    1: '#E5E5E5',
                },
            },
        },
    },
    plugins: [],
};
