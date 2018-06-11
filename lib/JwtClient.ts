/**
 * Filename:    JwtClient.ts
 * Created:     08/06/18, at 1:56 PM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import { AbstractClient } from './AbstractClient'
import axios, {AxiosPromise} from 'axios'

class JwtClient extends AbstractClient{
  private jwt: string

  public constructor(baseUrl: string, jwt: string, xApiKey?: string, config: {[key: string]: any} = {}){
    super(baseUrl, xApiKey, config)

    this.jwt = jwt
  }

  protected createRequest(
    method: string,
    path: string,
    headers: {[key: string]: any},
    body: string
  ): AxiosPromise{
    headers['Authorization'] = 'Bearer ' + this.jwt

    return axios({
      baseURL: this.getBaseUrl(),
      url: path,
      method: method,
      headers: headers,
      data: body
    })
  }
}