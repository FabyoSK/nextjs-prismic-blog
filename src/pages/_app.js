import { PrismicProvider } from '@prismicio/react';

function MyApp({ Component, pageProps }) {
  return (
    <PrismicProvider>
      <Component {...pageProps} />
    </PrismicProvider>
  );
}

export default MyApp;
