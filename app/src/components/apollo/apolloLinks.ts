import { onError } from '@apollo/client/link/error'
import { toast } from 'react-hot-toast'
import { useAccessToken, useLogout, useRefreshToken, useSaveAuthenticationToken } from '../../utils/authenticationUtils'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, ApolloLink, FetchResult, Observable } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { GraphQLError } from 'graphql'
import { RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables } from '../../types/graphql'
import REFRESH_ACCESS_TOKEN from '../../graphql/users/mutations/refreshAccessToken.graphql'

export const useErrorLink = (apolloClient: ApolloClient<object>): ApolloLink => {
  const { t } = useTranslation()
  const refreshToken = useRefreshToken()
  const logout = useLogout()
  const saveAuthenticationToken = useSaveAuthenticationToken()

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (!graphQLErrors && !networkError) return

    if (!graphQLErrors) {
      toast.error(t('Something went wrong'))
      return
    }

    for (const graphqlError of graphQLErrors) {
      if (graphqlError.extensions?.code === 401) {
        // ignore 401 error for a refresh request
        if (operation.operationName === 'refreshToken') return

        const observable = new Observable<FetchResult<Record<string, object>>>((observer) => {
          void (async () => {
            try {
              if (!refreshToken) {
                throw new GraphQLError('Empty refresh token')
              }

              const { data } = await apolloClient.mutate<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>({ mutation: REFRESH_ACCESS_TOKEN, variables: { input: { refreshToken } } })

              if (!data?.refreshAccessToken.accessToken) {
                throw new GraphQLError('Empty access token')
              }

              saveAuthenticationToken(data.refreshAccessToken)

              // Retry the failed request
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer)
              }

              forward(operation).subscribe(subscriber)
            } catch (err) {
              observer.error(err)
              logout()
            }
          })()
        })

        return observable
      }
    }

    const errorString = graphQLErrors.map((error) => error.message).join('\n')
    toast.error(errorString)
  })

  return errorLink
}

export const useAuthLink = (): ApolloLink => {
  const accessToken = useAccessToken()
  const refreshToken = useRefreshToken()

  const authLink = setContext((request, { headers }: { headers: { [_: string]: string } }): { headers: { [_: string]: string } } => {
    const token = request.operationName !== 'refreshAccessToken' ? accessToken : refreshToken

    if (!token) {
      return { headers }
    }

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    }
  })

  return authLink
}
