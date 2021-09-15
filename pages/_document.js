import Document, { Html, Head, Main, NextScript } from "next/document";

class IotDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* TODO: uncomment the code below */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <link rel="apple-touch-icon" href="/vercel.svg"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default IotDocument;
