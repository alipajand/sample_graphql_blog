import React from 'react';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.scss';
import { Layout } from '@/components';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
