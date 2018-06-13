/**
 * Filename:    JwtClient.ts
 * Created:     08/06/18, at 1:56 PM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import { AbstractClient } from './AbstractClient'
import axios, {AxiosPromise} from 'axios'

/**
 * Client that uses JWT for authentication
 */
class JwtClient extends AbstractClient{
  private jwt: string

  /**
   * Sets up a new JWT client.
   *
   * @param baseUrl         The base-url for the request, no trailing '/'
   * @param jwt             The JWT to use for Authentication
   * @param xApiKey         An API key to use during requests, if needed
   * @param config          Axios configuration
   */
  public constructor(baseUrl: string, jwt: string, xApiKey?: string, config: {[key: string]: any} = {}){
    super(baseUrl, xApiKey, config)

    this.jwt = jwt
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
  protected createRequest(
    method: string,
    endpoint: string,
    headers: {[key: string]: any},
    body: string
  ): AxiosPromise{
    headers['Authorization'] = 'Bearer ' + this.jwt

    return axios(Object.assign({}, this.getConfig(), {
      baseURL: this.getBaseUrl(),
      url: endpoint,
      method: method,
      headers: headers,
      data: body
    }))
  }
}