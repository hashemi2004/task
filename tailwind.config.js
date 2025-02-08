module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: ['Vazirmatn', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        Primary: '#00CC99',
        Secondary: '#FF3333',
        Gray: '#999999',
        TextColor: '#333333',
        GrayBorder: '#CCCCCC',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
