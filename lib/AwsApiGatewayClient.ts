/**
 * Filename:    AwsApiGatewayClient.ts
 * Created:     08/06/18, at 10:22 AM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import { AbstractClient } from './AbstractClient'
import axios, {AxiosPromise} from 'axios'
import aws4 from 'aws4'

/**
 * Client which will allow us to sign requests we make using sigv4.
 */
export class AwsApiGatewayClient extends AbstractClient{
  /**
   * Sets up a new AWS API Gateway client.
   *
   * @param baseUrl         The base-url for the request, no trailing '/'
   * @param accessKeyId     The AWS access key id
   * @param secretAccessKey The AWS secret access key
   * @param xApiKey         An API key to use during requests, if needed
   * @param config          Axios configuration
   */
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