/** @type {import('tailwindcss').Config} */
export default {
    content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    daisyui: {
        // themes: ['coffee', 'emerald', 'indigo', 'purple', ''],
        themes: ['indigo'],
    },
    plugins: [require('daisyui')],
};
