/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Exact palette from the slide decks
        bg:        '#0D0D0A',
        card:      '#1A1A14',
        rule:      '#2E2C24',
        gold:      '#C8A96E',
        'gold-dim':'#8A6E3C',
        ivory:     '#E8E0D0',
        mist:      '#F0E8D8',
        grey:      '#7A7060',
        charcoal:  '#2A2820',
        // Accent colours used in slides
        slate:     '#3A4A5A',
        sage:      '#5A8A5A',
        rust:      '#8A3020',
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
