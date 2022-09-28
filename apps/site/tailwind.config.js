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
      current: 'currentColor',
      primary: '#23ff82',
      container: {
        dark: '#A5A4FF',
        text: '#E3E3F8',
      },
      chip: '#2A9CA6',
      white: colors.white,
      black: colors.black,
      yellow: '#FFF030',
      inverted: '#122a48',
      scroll: {
        button: '#2d3040',
        hover: '#474c63',
      },
      indigo: {
        50: '#eef2ff',
        500: '#8B9CFB',
        600: '#5A72F8',
        700: '#4338ca',
      },
      gray: {
        50: '#bfbfbf',
        100: '#9DA7B9',
        700: '#82818e',
        900: '#202124',
      },
      navbar: '#202124',
      transparent: 'transparent',
      lightBlue: '#3BD9E7',
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
      footer: ['1rem', { lineHeight: '19.2px' }], //16px
      body: ['0.9375rem', { lineHeight: '18px' }], //15px
      caption: ['0.75rem', { lineHeight: '14.4px' }], //12px
      button: ['0.875rem', { letterSpacing: '0.03em', lineHeight: '24px' }], //14px
      'mobile-h1': ['1.5rem', { letterSpacing: '0.05em', lineHeight: '36px' }], //24px
      'mobile-section': [
        '1.125rem',
        { letterSpacing: '0.05em', lineHeight: '36px' },
      ], //18px
      'mobile-md': ['1.25rem', { letterSpacing: '0.05em', lineHeight: '24px' }], //20px
      'mobile-sm': ['0.625rem', { lineHeight: '12px' }], //10px
      'sidebar-links': [
        '1rem',
        { letterSpacing: '0.03em', lineHeight: '24px' },
      ], //16px
      'sidebar-rights': ['0.75rem', { lineHeight: '24px' }], //12px
      'sidebar-footer': ['1.125rem', { lineHeight: '26.01px' }], //18px
      tab: ['1rem', { lineHeight: '19px' }], //16px
      count: ['0.875rem', { letterSpacing: '0.02em', lineHeight: '20px' }], //14px
    },
    fontWeight: {
      normal: defaultTheme.fontWeight.normal,
      medium: defaultTheme.fontWeight.medium,
      semibold: defaultTheme.fontWeight.semibold,
      bold: defaultTheme.fontWeight.bold,
    },
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
    extend: {
      gridTemplateColumns: {
        fill: 'repeat(auto-fill, 312px)',
        'fill-mobile': 'repeat(auto-fill, 165px)',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      // from https://github.com/tailwindlabs/tailwindcss/pull/6086
      addVariant('children', '& > *');
    },
  ],
};
