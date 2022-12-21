import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosRetry, { exponentialDelay } from 'axios-retry'
import logger from './logger'

// ts-expect-error this keeps on happening
axiosRetry(axios, { retries: 3, retryDelay: exponentialDelay, shouldResetTimeout: true })

export const get = async <T extends object>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  logger.debug(`GET ${url}${config ? ` - ${JSON.stringify(config)} ` : ''}`)

  try {
    const response = await axios.get<T>(url, config)
    return response
  } catch (error) {
    logger.error(`Failed to GET to ${url}`)
    throw error
  }
}

export const post = async <T extends object>(url: string, data: object, config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  logger.debug(`POST ${url}${data ? ` - ${JSON.stringify(data)}` : ''}${config ? ` - ${JSON.stringify(config)} ` : ''}`)
  try {
    const response = await axios.post<T>(url, data, config)
    return response
  } catch (error) {
    logger.error(`Failed to POST to ${url}`)
    throw error
  }
}
