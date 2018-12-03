import { UriOptions } from "request";
import * as request from "request-promise-native";

interface ICustomWindow extends Window {
    initialData?: string;
  }

/**
 * Async implementation of basic HTTP type requests.
 * @param options Standard HTTP request type options.
 */
async function makeRequest<T>(
    options: UriOptions & request.RequestPromiseOptions
  ): Promise<T | undefined> {
    try {
      return await request(options);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      return;
    }
  }

export {
    makeRequest,
    ICustomWindow
}