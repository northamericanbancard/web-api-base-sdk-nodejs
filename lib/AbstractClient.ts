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

export abstract class AbstractClient implements ClientInterface {
  private baseUrl: string
  private headers: {[key: string]: any}

  public constructor(baseUrl: string, xApiKey?: string, config: {[key: string]: any} = {}){
    var headers: {[key: string]: any}

    this.baseUrl = baseUrl

    // By default, let's not throw exceptions on non-200 responses.
    if (!('http_errors' in config)) {
      config['http_errors'] = false
    }

    headers = {'Content-Type': 'application/json'}
    if ('headers' in config){
      Object.assign(headers, config['headers'])
    }

    if (xApiKey){
      headers['x-api-key'] = xApiKey
    }

    this.headers = headers
  }

  public swapBaseUrl(newBaseUrl: string): void
  {
    this.baseUrl = newBaseUrl
  }

  public httpGet(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise {
    return this.doSendRequest(HttpMethod.HTTP_METHOD_GET, path, queryParams, headers, body)
  }

  public httpPost(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise {
    return this.doSendRequest(HttpMethod.HTTP_METHOD_POST, path, queryParams, headers, body)
  }

  public httpPut(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise {
    return this.doSendRequest(HttpMethod.HTTP_METHOD_PUT, path, queryParams, headers, body)
  }

  public httpDelete(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise {
    return this.doSendRequest(HttpMethod.HTTP_METHOD_DELETE, path, queryParams, headers, body)
  }

  protected getBaseUrl(): string{
    return this.baseUrl
  }

  protected getHeaders(): {[key: string]: any}{
    return this.headers;
  }

  protected abstract createRequest(
    method: string,
    path: string,
    headers: {[key: string]: any},
    body: string
  ): AxiosPromise;

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