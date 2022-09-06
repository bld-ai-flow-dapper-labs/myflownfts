import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="h-full" lang="en">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/nys4xzx.css" />
      </Head>
      <body className="h-full font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
