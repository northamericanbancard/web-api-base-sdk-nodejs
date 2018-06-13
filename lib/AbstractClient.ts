/**
 * Filename:    AbstractClient.ts
 * Created:     06/06/18, at 1:19 PM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import { ClientInterface } from './ClientInterface'
import * as querystring from 'querystring'
import {AxiosPromise} from 'axios'
import { HttpMethod } from './HttpMethod'

/**
 * Parent of any client this library supports regarding authentication.
 */
export abstract class AbstractClient implements ClientInterface {
  private baseUrl: string
  private headers: {[key: string]: any}
  private config: {[key: string]: any}

  /**
   * Sets up a new client implementation. We are being restrictive here for aid in debugging and control
   * over Axios changes as they change implementations.
   *
   * @param baseUrl The base URL, without trailing / or query params.
   * @param xApiKey An API key header (usually associated with AWS APIG)
   * @param config  Any Axios configuration
   */
  public constructor(baseUrl: string, xApiKey?: string, config: {[key: string]: any} = {}){
    var headers: {[key: string]: any}

    this.baseUrl = baseUrl

    headers = {'Content-Type': 'application/json'}
    if ('headers' in config){
      Object.assign(headers, config['headers'])
      delete config['headers']
    }

    if (xApiKey){
      headers['x-api-key'] = xApiKey
    }

    this.headers = headers
    this.config = config
  }

/**
 * A special little gift for this base SDK. If you ever come across the need where your `one` SDK is actually
 * the same `path` spread across more than one host - you can swap hosts on run-time to allow you to aggregate
 * results from the same SDK rather than creating new services over and over.
 *
 * NOTE: Because this class will most-likely be wrapped up by your actual SDK - you are going to have to
 * have a function, such as `getClient`, that returns the current instance.
 *
 * @param newBaseUrl The new base-url - no trailing `/`.
 */
  public swapBaseUrl(newBaseUrl: string): void {
    this.baseUrl = newBaseUrl
  }

  /**
   * Wrapper around Axios's sending process of a GET request.
   *
   * @param path        The path to send the request to (no query params)
   * @param queryParams Any query params to attach to the url
   * @param headers     Extra headers to add to Axios's default
   * @param body        The body of the get request
   */
  public httpGet(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise {
    return this.doSendRequest(HttpMethod.HTTP_METHOD_GET, path, queryParams, headers, body)
  }

  /**
   * Wrapper around Axios's sending process of a POST request.
   *
   * @param path        The path to send the request to (no query params)
   * @param queryParams Any query params to attach to the url
   * @param headers     Extra headers to add to Axios's default
   * @param body        The body of the POST request
   */
  public httpPost(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise {
    return this.doSendRequest(HttpMethod.HTTP_METHOD_POST, path, queryParams, headers, body)
  }

  /**
   * Wrapper around Axios's sending process of a PUT request.
   *
   * @param path        The path to send the request to (no query params)
   * @param queryParams Any query params to attach to the url
   * @param headers     Extra headers to add to Axios's default
   * @param body        The body of the PUT request
   */
  public httpPut(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise {
    return this.doSendRequest(HttpMethod.HTTP_METHOD_PUT, path, queryParams, headers, body)
  }

  /**
   * Wrapper around Axios's sending process of a DELETE request.
   *
   * @param path        The path to send the request to (no query params)
   * @param queryParams Any query params to attach to the url
   * @param headers     Extra headers to add to Axios's default
   * @param body        The body of the DELETE request
   */
  public httpDelete(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise {
    return this.doSendRequest(HttpMethod.HTTP_METHOD_DELETE, path, queryParams, headers, body)
  }

  /**
   * @returns The base URL used for requests
   */
  protected getBaseUrl(): string{
    return this.baseUrl
  }

  /**
   * @returns The HTTP headers used for requests
   */
  protected getHeaders(): {[key: string]: any}{
    return this.headers;
  }

  /**
   * @returns The base Axios config used for requests
   */
  protected getConfig(): {[key: string]: any}{
    return this.config;
  }

  /**
   * Helper to create the final request object.
   *
   * @param method   The HTTP Method to use in the Request
   * @param endpoint The final endpoint (including the query params)
   * @param headers  An array of headers to send
   * @param body     The body of the Request
   * @returns        The Promise object for the created request
   */
  protected abstract createRequest(
    method: string,
    endpoint: string,
    headers: {[key: string]: any},
    body: string
  ): AxiosPromise;

  /**
   * Wrapper around Axios's sending process of a request.
   *
   * @param method      The HTTP method of the request
   * @param path        The path to send the request to (no query params)
   * @param queryParams Any query params to attach to the url
   * @param headers     Extra headers to add to Axios's default
   * @param body        The body of the post request
   * @returns           The Promise object for the sent request
   */
  private doSendRequest(
    method: string,
    path: string,
    queryParams: {[key: string]: any},
    headers: {[key: string]: any},
    body: string
  ): AxiosPromise{
    var requestHeaders: {[key: string]: any}

    if (queryParams && Object.keys(queryParams).length){
      path += '?' + querystring.stringify(queryParams)
    }

    requestHeaders = Object.assign({}, this.headers, headers)
    return this.createRequest(method, path, requestHeaders, body)
  }
}