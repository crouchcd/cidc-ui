import { Response } from "request";
import currentUrl from "../initialize";
import { ICustomWindow, makeRequest } from "./api";

interface IAPIHelperOptions {
    endpoint: string;
    etag?: string;
    itemID?: string;
    token?: string;
    parameters?: { [key: string]: string };
}

interface IAPIHelper {
    baseURL: string;
    delete(opts: IAPIHelperOptions): Promise<Response | undefined>;
    get(opts: IAPIHelperOptions): Promise<Response | undefined>;
    patch(opts: IAPIHelperOptions): Promise<Response | undefined>;
    post(opts: IAPIHelperOptions): Promise<Response | undefined>;
}

const generateOptions = (
    opts: IAPIHelperOptions,
    method: string,
    baseURL: string
) => {
    return {
        headers: {
            Authorization: `Bearer ${opts.token}`
        },
        json: true,
        method,
        qs: opts.parameters,
        uri: `${baseURL}/${opts.endpoint}${
            opts.itemID ? `/${opts.itemID}` : ""
        }`
    };
};

/**
 * Factory function menat to emulate my SmartFetch class in python.
 * @param baseURL pass an object of the type { baseURL: your-url-here }
 */
const createAPIHelper = ({ baseURL }: { baseURL: string }): IAPIHelper => {
    const get = (opts: IAPIHelperOptions): Promise<Response | undefined> => {
        return makeRequest<Response | undefined>(
            generateOptions(opts, "GET", baseURL)
        );
    };
    const patch = (opts: IAPIHelperOptions): Promise<Response | undefined> => {
        return makeRequest<Response | undefined>(
            generateOptions(opts, "PATCH", baseURL)
        );
    };
    const post = (opts: IAPIHelperOptions): Promise<Response | undefined> => {
        return makeRequest<Response | undefined>(
            generateOptions(opts, "POST", baseURL)
        );
    };
    const delF = (opts: IAPIHelperOptions): Promise<Response | undefined> => {
        return makeRequest<Response | undefined>(
            generateOptions(opts, "DELETE", baseURL)
        );
    };
    return Object.freeze({
        baseURL,
        delete: delF,
        get,
        patch,
        post
    });
};

async function recordDelete(recordID: string): Promise<boolean> {
    // tslint:disable-next-line:no-console
    console.log('Delete function fired')
    const customWindow: ICustomWindow = window;
    const uriHelper = createAPIHelper({ baseURL: currentUrl });
    const results = await uriHelper.patch({
        endpoint: "data",
        itemID: recordID,
        parameters: {
            visibility: "0"
        },
        token: customWindow.initialData
    }).catch((e) => {
        // tslint:disable-next-line:no-console
        console.log(e)
    });
    if (!results) {
        return false;
    }
    if (results.statusCode === 200) {
        return true;
    }
    return false;
}

export {
    recordDelete,
    generateOptions
}