import React from 'react'
import { useAuthLink, useErrorLink } from './apolloLinks'
import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client'

// @ts-expect-error import.meta.env is unknown
const uri = `${import.meta.env.VITE_API_URL as string}/graphql`

const apolloClient = new ApolloClient({
  cache: new InMemoryCache()
})

export const ApolloClientProvider = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
  const errorLink = useErrorLink(apolloClient)
  const authLink = useAuthLink()
  const links = from([authLink, errorLink, new HttpLink({ uri })])
  apolloClient.setLink(links)

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
