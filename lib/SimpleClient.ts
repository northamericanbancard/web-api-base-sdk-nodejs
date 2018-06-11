/**
 * Filename:    SimpleClient.ts
 * Created:     08/06/18, at 2:13 PM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import { AbstractClient } from './AbstractClient'
import axios, {AxiosPromise} from 'axios'

class SimpleClient extends AbstractClient{
  protected createRequest(
    method: string,
    path: string,
    headers: {[key: string]: any},
    body: string
  ): AxiosPromise{
    return axios({
      baseURL: this.getBaseUrl(),
      url: path,
      method: method,
      headers: headers,
      data: body
    })
  }
}