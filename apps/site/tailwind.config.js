const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      primary: '#23ff82',
      white: colors.white,
      inverted: '#122a48',
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
      subtitle: ['1.125rem'],
    },
    extend: {
      backgroundImage: (theme) => ({
        header: "url('../../src/components/PageLanding/images/bg-header.png')",
        intro: "url('../../src/components/PageLanding/images/bg-intro.png')",
        partners:
          "url('../../src/components/PageLanding/images/bg-partners.png')",
      }),
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
