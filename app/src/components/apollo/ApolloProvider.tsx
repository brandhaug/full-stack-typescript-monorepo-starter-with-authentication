import React from 'react'
import { useAuthLink, useErrorLink } from './apolloLinks'
import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client'

const uri = 'http://localhost:4000/graphql'

const apolloClient = new ApolloClient({
  uri,
  cache: new InMemoryCache()
})

export const ApolloClientProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const errorLink = useErrorLink(apolloClient)
  const authLink = useAuthLink()
  const links = from([authLink, errorLink, new HttpLink({ uri })])
  apolloClient.setLink(links)

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
