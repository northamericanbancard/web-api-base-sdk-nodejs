/**
 * Filename:    SimpleClient.ts
 * Created:     08/06/18, at 2:13 PM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import { AbstractClient } from './AbstractClient'
import axios, {AxiosPromise} from 'axios'

/**
 * Simple client sans authentication standards (with exception of possible x-api-key, if you so wish).
 */
class SimpleClient extends AbstractClient{
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
      data: body
    }))
  }
}