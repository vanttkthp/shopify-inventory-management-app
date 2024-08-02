/*
 * Apollo Client builder
 * (based on next.js withApollo example)
 */
require('isomorphic-fetch');
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: new HttpLink({
            uri: `${process.env.HOST || ''}/graphql`, // Server URL (must be absolute)
            credentials: 'include', // Additional fetch() options like `credentials` or `headers`
            headers: {
                cookie: ctx && ctx.req.headers['cookie']
            },
            fetch,
        }),
        cache: new InMemoryCache().restore(initialState),
    });
}