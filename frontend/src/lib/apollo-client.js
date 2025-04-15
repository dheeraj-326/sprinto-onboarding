import { ApolloClient, InMemoryCache, createHttpLink, concat } from '@apollo/client';
import { connectApolloClientToVSCodeDevTools } from "@apollo/client-devtools-vscode";
import { setContext } from '@apollo/client/link/context';

console.log(process.env.NEXT_PUBLIC_BACKEND_ROOT)

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_ROOT, // or hardcoded like 'https://your-backend.com/graphql'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

const devtoolsRegistration = connectApolloClientToVSCodeDevTools(
    client,
    // the default port of the VSCode DevTools is 7095
    "ws://localhost:7095",
  );

export default client;