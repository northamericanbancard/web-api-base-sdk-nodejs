/**
 * Filename:    ClientInterface.ts
 * Created:     08/06/18, at 1:13 PM
 * @author      Mike Alameh <malameh@nabancard.com>
 * @copyright   1992-2018 North American Bancard
 */
import { AxiosPromise } from 'axios'

export interface ClientInterface{
  httpGet(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise

  httpPost(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise

  httpPut(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise

  httpDelete(
    path: string,
    queryParams: {[key: string]: any} = {},
    headers: {[key: string]: any} = {},
    body?: string
  ): AxiosPromise
}