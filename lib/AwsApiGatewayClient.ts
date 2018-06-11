/**
 * Filename:    AwsApiGatewayClient.ts
 * Created:     08/06/18, at 10:22 AM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import { AbstractClient } from './AbstractClient'
import axios, {AxiosPromise} from 'axios'
import aws4 from 'aws4'

export class AwsApiGatewayClient extends AbstractClient{
  public constructor(
    baseUrl: string,
    accessKeyId: string,
    secretAccessKey: string,
    xApiKey?: string,
    config: {[key: string]: any} = {}
  ){
    var signatureHeaders: {[key: string]: any} = {}

    aws4.sign(signatureHeaders, {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    })

    if(!('headers' in config)){
      config['headers'] = {}
    }

    config['headers']['X-Amz-Date'] = signatureHeaders['X-Amz-Date']
    config['headers']['Authorization'] = signatureHeaders['Authorization']

    super(baseUrl, xApiKey, config)
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
      data: body
    })
  }
}