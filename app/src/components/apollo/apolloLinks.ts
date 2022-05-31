import { onError } from '@apollo/client/link/error'
import { toast } from 'react-hot-toast'
import { useAccessToken, useLogout, useRefreshToken, useSaveAuthenticationToken } from '../../utils/authenticationUtils'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, FetchResult, Observable } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { GraphQLError } from 'graphql'
import { RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables } from '../../types/graphql'
import REFRESH_ACCESS_TOKEN from '../../graphql/users/mutations/refreshAccessToken.graphql'

export const useErrorLink = (apolloClient: ApolloClient<any>) => {
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

      for (let err of graphQLErrors) {
        if (err.extensions.code === 401) {
          // ignore 401 error for a refresh request
          if (operation.operationName === 'refreshToken') return

          const observable = new Observable<FetchResult<Record<string, any>>>(
            (observer) => {

              (async () => {
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
            }
          )

          return observable
        }
      }

      const errorString = graphQLErrors.map(error => error.message).join('\n')
      toast.error(errorString)
    }
  )

  return errorLink
}

export const useAuthLink = () => {
  const accessToken = useAccessToken()
  const refreshToken = useRefreshToken()

  const authLink = setContext(async (request, { headers }: { headers: { [_: string]: string } }) => {
    const token = request.operationName !== 'refreshAccessToken' ? accessToken : refreshToken

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  return authLink
}
