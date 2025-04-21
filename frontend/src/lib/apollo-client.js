import { ApolloClient, InMemoryCache, createHttpLink, concat } from '@apollo/client';
import { connectApolloClientToVSCodeDevTools } from "@apollo/client-devtools-vscode";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_ROOT, // or hardcoded like 'https://your-backend.com/graphql'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

export default client;