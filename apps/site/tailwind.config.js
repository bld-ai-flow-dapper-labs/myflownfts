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
      secondary: '#5A72F8',
      white: colors.white,
      inverted: '#122a48',
      'button-browse': '#2d3040',
      indigo: {
        50: '#eef2ff',
        600: '#4f46e5',
        700: '#4338ca',
      },
    },
    fontSize: {
      inherit: 'inherit',
      h1: ['3.25rem'],
      h2: ['2.25rem'],
      h3: ['2rem'],
      h4: ['1.5rem'],
      subtitle: ['1.125rem'],
      'button-medium': ['0.875rem'],
    },
    fontWeight: {
      normal: defaultTheme.fontWeight.normal,
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
