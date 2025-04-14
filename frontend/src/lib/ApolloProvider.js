'use client';

import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';

export default function ApolloWrapper({ children }) {
    console.log("Apollo Client URI in provider:", client.link.options?.uri);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}