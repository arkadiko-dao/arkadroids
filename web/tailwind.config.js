const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.html',
    './src/**/*.tsx',
    './components/**/*.tsx',
    './public/html/*.html'
  ],
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['20px', '30px'],
      medium: ['30px', '45px'],
      lg: ['60px', '80px'],
      xl: ['100px', '120px'],
    },
    colors: {
      'white': '#ffffff',
      'almost-white': '#e0e0e0',
      'almost-black': '#222222',
      'black': '#000000',
      'yellow': '#ffc82c',
      'gray-card': '#1a1c1e',
      'neon-pink': '#FD3CE3',
      'neon-cyan': '#00F5FF',
      'purple': '#9500FF'
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        pixel: ['Pixel Operator Bold', ...defaultTheme.fontFamily.sans],
        'syne-mono': ['Syne Mono', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
