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
      black: colors.black,
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
      'nav-mobile': '#2021244D',
      transparent: 'transparent',
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
      'mobile-h1': ['1.5rem', { letterSpacing: '0.05em', lineHeight: '36px' }], //24px
      'mobile-section': [
        '1.125rem',
        { letterSpacing: '0.05em', lineHeight: '36px' },
      ], //18px
      'mobile-md': ['1.25rem', { letterSpacing: '0.05em', lineHeight: '24px' }],
    },
    fontWeight: {
      normal: defaultTheme.fontWeight.normal,
      medium: defaultTheme.fontWeight.medium,
      semibold: defaultTheme.fontWeight.semibold,
      bold: defaultTheme.fontWeight.bold,
    },
    screens: {
      xs: '450px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: (theme) => ({
        header:
          "url('../../src/components/PageLanding/images/header/bg-header.png')",
        'header-mobile':
          "url('../../src/components/PageLanding/images/header/bg-header-mobile.png')",
        'header-mobile-xs':
          "url('../../src/components/PageLanding/images/header/bg-header-mobile-xs.png')",
        'header-mobile-sm':
          "url('../../src/components/PageLanding/images/header/bg-header-mobile-sm.png')",
        intro:
          "url('../../src/components/PageLanding/images/intro/bg-intro.png')",
        'intro-mobile':
          "url('../../src/components/PageLanding/images/intro/bg-intro-mobile.png')",
        'intro-mobile-xs':
          "url('../../src/components/PageLanding/images/intro/bg-intro-mobile-xs.png')",
        'intro-mobile-sm':
          "url('../../src/components/PageLanding/images/intro/bg-intro-mobile-sm.png')",
        partners:
          "url('../../src/components/PageLanding/images/partners/bg-partners.png')",
        'partners-mobile':
          "url('../../src/components/PageLanding/images/partners/bg-partners-mobile.png')",
        'community-featured':
          "url('../../src/components/PageLanding/images/community-featured/bg-community-featured.png')",
        'community-featured-mobile':
          "url('../../src/components/PageLanding/images/community-featured/bg-community-featured-mobile.png')",
        signup:
          "url('../../src/components/PageLanding/images/signup/bg-signup.png')",
        'signup-mobile':
          "url('../../src/components/PageLanding/images/signup/bg-signup-mobile.png')",
      }),
    },
  },
  plugins: [],
};
