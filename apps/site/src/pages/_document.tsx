import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="h-full" lang="en">
      <Head>
        <meta name="theme-color" content="transparent" />
        <link rel="stylesheet" href="https://use.typekit.net/nys4xzx.css" />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/favicon-64x64.png"
        />
      </Head>
      <body className="h-full font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
