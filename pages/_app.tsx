import type { AppProps } from 'next/app'
import { ApolloProvider } from 'react-apollo';
import { GlobalStateProvider } from '@/context';
import client from '@/apollo-client';
import Layout from '@/components/layout';
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <GlobalStateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalStateProvider>
    </ApolloProvider>
  );
}
