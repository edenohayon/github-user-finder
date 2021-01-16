module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'about-image': "url('./assets/about3.jpg')",
        
       })
    },
    spinner: (theme) => ({
      default: {
        color: '#F7337A', // color you want to make the spinner
        size: '8em', // size of the spinner (used for both width and height)
        border: '5px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '900ms', // the speed at which the spinner should rotate
      },
      // md: {
      //   color: theme('colors.red.500', 'red'),
      //   size: '2em',
      //   border: '2px',
      //   speed: '500ms',
      // },
    }),
  },
  variants: {
    extend: {},
    spinner: ['responsive'],
  },
  plugins: [    
    require('tailwindcss-spinner')({ className: 'spinner', themeKey: 'spinner' }),
],
}
