//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const nextTranslate = require('next-translate');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: true,
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
module.exports = withNx(nextTranslate(nextConfig));
