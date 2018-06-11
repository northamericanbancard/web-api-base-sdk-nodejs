/**
 * Filename:    BaseClient.ts
 * Created:     07/06/18, at 2:46 PM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import {AbstractClient} from './AbstractClient'
import axios, {AxiosPromise} from 'axios'

export class BaseClient extends AbstractClient{
  private username: string
  private password: string

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
      data: body,
      auth: {
        username: this.username,
        password: this.password
      }
    })
  }
}