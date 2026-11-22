/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        paper: 'var(--paper)',
        sand: 'var(--sand)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        rouge: 'var(--rouge)',
        'rouge-ink': 'var(--rouge-ink)',
        blush: 'var(--blush)',
        'lvl-1': 'var(--lvl-1)',
        'lvl-2': 'var(--lvl-2)',
        'lvl-3': 'var(--lvl-3)',
        'lvl-4': 'var(--lvl-4)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: { card: '20px', btn: '12px', field: '6px' },
      boxShadow: { card: '0 1px 2px rgba(26,26,26,0.06), 0 8px 24px rgba(26,26,26,0.06)' },
    },
  },
  plugins: [],
};
