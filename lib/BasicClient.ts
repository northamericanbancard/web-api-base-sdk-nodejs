/**
 * Filename:    BaseClient.ts
 * Created:     07/06/18, at 2:46 PM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import {AbstractClient} from './AbstractClient'
import axios, {AxiosPromise} from 'axios'

/**
 * Client that uses HTTP Basic auth
 */
export class BasicClient extends AbstractClient{
  private username: string
  private password: string

  /**
   * Sets up a new Basic client.
   *
   * @param baseUrl         The base-url for the request, no trailing '/'
   * @param username        The username to use for HTTP Basic auth
   * @param password        The password to use for HTTP Basic auth
   * @param xApiKey         An API key to use during requests, if needed
   * @param config          Axios configuration
   */
  public constructor(
    baseUrl: string,
    username: string,
    password: string,
    xApiKey?: string,
    config : {[key: string]: any} = {}
  ){
    super(baseUrl, xApiKey, config)

    this.username = username
    this.password = password
  }

  /**
   * Helper to create the final request object.
   *
   * @param method   The HTTP Method to use in the Request
   * @param endpoint The final endpoint (including the query params)
   * @param headers  An array of headers to send
   * @param body     The body of the Request
   */
  protected createRequest(
    method: string,
    endpoint: string,
    headers: {[key: string]: any},
    body: string
  ): AxiosPromise{
    return axios(Object.assign({}, this.getConfig(), {
      baseURL: this.getBaseUrl(),
      url: endpoint,
      method: method,
      headers: headers,
      data: body,
      auth: {
        username: this.username,
        password: this.password
      }
    }))
  }
}