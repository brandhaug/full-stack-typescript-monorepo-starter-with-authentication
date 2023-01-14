import { onError } from '@apollo/client/link/error'
import { toast } from 'react-hot-toast'
import { useAccessToken, useLogout, useRefreshToken, useSaveAuthenticationToken } from '../../utils/authenticationUtils'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, ApolloLink, FetchResult, Observable } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables } from '../../types/graphqlTypes'
import REFRESH_ACCESS_TOKEN from '../../graphql/users/mutations/refreshAccessToken.graphql'

export const useErrorLink = (apolloClient: ApolloClient<object>): ApolloLink => {
  const { t } = useTranslation()
  const refreshToken = useRefreshToken()
  const logout = useLogout()
  const saveAuthenticationToken = useSaveAuthenticationToken()

  // @ts-expect-error Unsure of the return type
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }): Observable<FetchResult<Record<string, object>>> | null | undefined => {
    if (!graphQLErrors && !networkError) return null

    if (!graphQLErrors) {
      toast.error(t('Something went wrong'))
      return null
    }

    for (const graphqlError of graphQLErrors) {
      if (graphqlError.extensions.code === 401) {
        // ignore 401 error for a refresh request
        if (operation.operationName === 'refreshToken') return null

        const observable = new Observable<FetchResult<Record<string, object>>>((observer) => {
          void (async () => {
            try {
              if (!refreshToken) {
                throw new Error('Empty refresh token')
              }

              const { data } = await apolloClient.mutate<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>({ mutation: REFRESH_ACCESS_TOKEN, variables: { input: { refreshToken } } })

              if (!data?.refreshAccessToken.authenticationToken.accessToken) {
                throw new Error('Empty access token')
              }

              saveAuthenticationToken(data.refreshAccessToken.authenticationToken)

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
    return null
  })

  return errorLink
}

export const useAuthLink = (): ApolloLink => {
  const accessToken = useAccessToken()
  const refreshToken = useRefreshToken()

  const authLink = setContext((request, { headers }: { headers: Record<string, string> }): { headers: Record<string, string> } => {
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
