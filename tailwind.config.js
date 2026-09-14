/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#06040c',
          900: '#0b0614',
          800: '#150c24',
          700: '#211334',
          600: '#301b49',
        },
        rose: {
          200: '#ffd6e7',
          300: '#ffb3d1',
          400: '#ff8fbd',
          500: '#ff5fa2',
          600: '#e13d82',
          700: '#b82b67',
        },
        gold: {
          300: '#ffe9b3',
          400: '#ffd873',
          500: '#f4c04c',
        },
        blush: '#f7e7ec',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        body: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'night-gradient':
          'radial-gradient(circle at 50% 0%, #211334 0%, #0b0614 55%, #06040c 100%)',
        'card-glow':
          'linear-gradient(135deg, rgba(255,95,162,0.18) 0%, rgba(244,192,76,0.10) 100%)',
      },
      boxShadow: {
        glow: '0 0 25px rgba(255, 95, 162, 0.35)',
        goldGlow: '0 0 20px rgba(244, 192, 76, 0.35)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1.1)' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateY(-110vh) translateX(20px)', opacity: 0 },
        },
        drift: {
          '0%': { transform: 'translateX(-10vw)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.1)' },
          '60%': { transform: 'scale(1)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1, transform: 'scaleY(1)' },
          '50%': { opacity: 0.75, transform: 'scaleY(0.92)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        floatUp: 'floatUp linear infinite',
        drift: 'drift linear infinite',
        heartbeat: 'heartbeat 1.1s ease-in-out infinite',
        flicker: 'flicker 0.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
