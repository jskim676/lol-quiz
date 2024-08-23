/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            spacing: {
                45: '45px',
                240: '240px',
                280: '280px',
                320: '320px',
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
