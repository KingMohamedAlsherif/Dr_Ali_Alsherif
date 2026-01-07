import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{mdx,md}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif']
      },
      colors: {
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        card: 'rgb(var(--card))',
        border: 'rgb(var(--border))',
        muted: 'rgb(var(--muted))',
        'muted-foreground': 'rgb(var(--muted-foreground))',
        sand: {
          50: '#fcfbf7',
          100: '#f6f0dd',
          200: '#efe0b8',
          300: '#e0c982',
          400: '#d4b25c',
          500: '#c29b3e',
          600: '#a67d2e',
          700: '#876027',
          800: '#6b4a22',
          900: '#533a1d'
        }
      },
      backgroundImage: {
        'arabesque-pattern': "url('data:image/svg+xml,%3Csvg width=\"160\" height=\"160\" viewBox=\"0 0 160 160\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" stroke=\"%23c29b3e\" stroke-width=\"0.8\" opacity=\"0.15\"%3E%3Cpath d=\"M80 10l25 25-25 25-25-25 25-25z\"/%3E%3Cpath d=\"M80 60l25 25-25 25-25-25 25-25z\"/%3E%3Cpath d=\"M80 110l25 25-25 25-25-25 25-25z\"/%3E%3Cpath d=\"M30 60l25 25-25 25-25-25 25-25z\"/%3E%3Cpath d=\"M130 60l25 25-25 25-25-25 25-25z\"/%3E%3C/g%3E%3C/svg%3E')"
      },
      boxShadow: {
        glow: '0 0 20px rgba(194, 155, 62, 0.25)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
