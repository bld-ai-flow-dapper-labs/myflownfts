const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      primary: '#23ff82',
      container: {
        dark: '#A5A4FF33',
        text: '#E3E3F8',
      },
      chip: '#2A9CA6',
      white: colors.white,
      inverted: '#122a48',
      'button-browse': '#2d3040',
      indigo: {
        50: '#eef2ff',
        600: '#5A72F8',
        700: '#4338ca',
      },
      gray: {
        700: '#82818e',
        900: '#202124',
      },
    },
    fontFamily: {
      sans: ['Termina', ...defaultTheme.fontFamily.sans],
      body: ['Acumin-Pro', ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      h1: ['3.25rem', { letterSpacing: '0.05em', lineHeight: '62.4px' }], //52px
      h2: ['2.5rem', { letterSpacing: '0.05em', lineHeight: '48px' }], // 40px
      h3: ['1.5rem', { lineHeight: '28.8px' }], //24px
      'h3-caps': ['1.5rem', { letterSpacing: '0.02em', lineHeight: '28.8px' }],
      h4: ['1.125rem', { lineHeight: '21.6px' }], //18px
      section: ['2rem', { letterSpacing: '0.05em', lineHeight: '38.4px' }], //32px
      md: ['2.25rem', { letterSpacing: '0.05em', lineHeight: '43.2px' }], //36px
      sm: ['1.5rem', { lineHeight: '28.8px' }], //24px
      title: ['1.125rem', { lineHeight: '21.6px' }], //18px
      footer: ['1rem', { lineHeight: '19.2px' }], //18px
      body: ['0.9375rem', { lineHeight: '18px' }], //15px
      caption: ['0.75rem', { lineHeight: '14.4px' }], //12px
      button: ['0.875rem', { letterSpacing: '0.03em', lineHeight: '24px' }], //14px
    },
    fontWeight: {
      normal: defaultTheme.fontWeight.normal,
      medium: defaultTheme.fontWeight.medium,
      semibold: defaultTheme.fontWeight.semibold,
      bold: defaultTheme.fontWeight.bold,
    },
    extend: {
      backgroundImage: (theme) => ({
        header: "url('../../src/components/PageLanding/images/bg-header.png')",
        intro: "url('../../src/components/PageLanding/images/bg-intro.png')",
        partners:
          "url('../../src/components/PageLanding/images/bg-partners.png')",
        'community-featured':
          "url('../../src/components/PageLanding/images/bg-community-featured.png')",
        signup: "url('../../src/components/PageLanding/images/bg-signup.png')",
      }),
    },
  },
  plugins: [],
};
