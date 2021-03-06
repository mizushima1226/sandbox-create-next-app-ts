import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import 'semantic-ui-css/semantic.min.css';

import { useApollo } from 'src/lib/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
