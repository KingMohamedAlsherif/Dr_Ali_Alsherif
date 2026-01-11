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
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif']
      },
      colors: {
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        card: 'rgb(var(--card))',
        border: 'rgb(var(--border))',
        muted: 'rgb(var(--muted))',
        'muted-foreground': 'rgb(var(--muted-foreground))',
        accent: 'rgb(var(--accent))',
        'accent-foreground': 'rgb(var(--accent-foreground))'
      },
      boxShadow: {
        soft: '0 12px 30px rgba(15, 23, 42, 0.08)',
        lift: '0 20px 45px rgba(15, 23, 42, 0.14)'
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
