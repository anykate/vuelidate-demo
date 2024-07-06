const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Raleway', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active', 'hover', 'disabled'],
            textColor: ['active', 'hover', 'disabled'],
            outline: ['hover', 'active'],
            opacity: ['disabled'],
            cursor: ['hover', 'disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
