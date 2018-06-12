/**
 * Filename:    ClientInterface.ts
 * Created:     08/06/18, at 1:13 PM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import { AxiosPromise } from 'axios'

/**
 * Interface for wrapper functions for supported HTTP method
 */
export interface ClientInterface{
  /**
   * Wrapper around Axios's sending process of a GET request.
   *
   * @param path        The path to send the request to (no query params)
   * @param queryParams Any query params to attach to the url
   * @param headers     Extra headers to add to Axios's default
   * @param body        The body of the GET request
   */
  httpGet(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise

  /**
   * Wrapper around Axios's sending process of a POST request.
   *
   * @param path        The path to send the request to (no query params)
   * @param queryParams Any query params to attach to the url
   * @param headers     Extra headers to add to Axios's default
   * @param body        The body of the POST request
   */
  httpPost(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise

  /**
   * Wrapper around Axios's sending process of a PUT request.
   *
   * @param path        The path to send the request to (no query params)
   * @param queryParams Any query params to attach to the url
   * @param headers     Extra headers to add to Axios's default
   * @param body        The body of the PUT request
   */
  httpPut(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise

  /**
   * Wrapper around Axios's sending process of a DELETE request.
   *
   * @param path        The path to send the request to (no query params)
   * @param queryParams Any query params to attach to the url
   * @param headers     Extra headers to add to Axios's default
   * @param body        The body of the DELETE request
   */
  httpDelete(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise
}