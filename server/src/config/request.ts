import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { logger } from './logger'
import { jsonStringify } from '../utils/object.utils'
import axiosRetry, { exponentialDelay, isNetworkOrIdempotentRequestError } from 'axios-retry'
import { setupCache } from 'axios-cache-interceptor'

const axios = setupCache(Axios)

axiosRetry(axios, {
  retries: 10,
  retryDelay: exponentialDelay,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  retryCondition: (err) => isNetworkOrIdempotentRequestError(err) || err.response?.status === 429
})

axios.interceptors.request.use((requestConfig) => {
  const url = axios.getUri(requestConfig)
  logger.debug(`${requestConfig.method?.toUpperCase() ?? ''} ${url}${requestConfig.data ? ` | Data: ${jsonStringify(requestConfig.data)}` : ''}`)
  return requestConfig
})

axios.interceptors.response.use(
  (response) => {
    logger.debug(
      `${response.status} ${response.statusText} ${response.config.method?.toUpperCase() ?? 'HTTP'} ${response.config.url ?? 'Unknown URL'} - ${response.config.cache ? 'Cache hit' : 'Cache miss'}`
    )
    return response
  },
  async (error) => {
    if (Axios.isAxiosError(error)) {
      logger.error(`${error.name}: ${error.message}, (${error.config?.method?.toUpperCase() ?? 'HTTP'} ${error.config?.url ?? 'Unknown URL'})`)
    } else if (error) {
      logger.error(error)
    } else {
      logger.error('Axios unknown error')
    }

    return await Promise.reject(error)
  }
)

const extractConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  const baseHeaders = {
    'Accept-Encoding': 'gzip,deflate,compress'
  }

  // @ts-expect-error Wut
  return { ...config, headers: { ...baseHeaders, ...config?.headers } }
}

export const get = async <T extends object>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T | undefined>> => {
  const response = await axios.get<T>(url, extractConfig(config))
  return response
}

export const post = async <T extends object>(url: string, data: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T | undefined>> => {
  const response = await axios.post<T>(url, data, extractConfig(config))
  return response
}
