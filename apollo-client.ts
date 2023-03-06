import ApolloClient, { InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
});

export default client;