import { Response } from "request";
import { currentUrl, customWindow } from "../initialize";
import IAPIDefaultFields from "../interfaces/IAPIDefaultFields";
import { IValidationError } from "../interfaces/IValidationError";
import {
    createAPIHelper,
    IAPIHelper,
    IAPIHelperOptions,
    makeRequest
} from "./utilities";

export interface IDataChild {
    _id: string;
    resource: string;
    validation_errors?: IValidationError[];
}

export interface IDataResult {
    _id: string;
    analysis_id?: string;
    children: IDataChild[];
    date_created: string;
    file_name: string;
    gs_uri: string;
    mapping: string;
    processed: boolean;
    sample_id?: string;
    visibility: boolean;
}

interface IDataResultItems {
    _items: Array<IDataResult & IAPIDefaultFields>;
}

export interface IChildResult {
    _id: string;
    record_id: string;
    validation_errors: IValidationError[];
}

interface IMapThing {
    [key: string]: string[];
}

/**
 * Maps children to groups under their resource collections.
 * @param children 
 */
const mapChildren = (children: IDataChild[]): { [key: string]: string[] } => {
    const map:IMapThing = {};
    children.forEach(child => {
        const { _id, resource } = child;
        resource in map ? map[resource].push(_id) : (map[resource] = [_id]);
    });
    return map;
};

/**
 * Function handling the actual patching of the records.
 * @param uriHelper APIHelper object handling the requests
 * @param opts Request options
 */
async function patchVisibility(
    uriHelper: IAPIHelper,
    opts: IAPIHelperOptions
): Promise<boolean> {
    const results = await uriHelper.patch<Response>(opts).catch(e => {
        // tslint:disable-next-line:no-console
        console.log(e);
    });

    if (!results) {
        return false;
    }
    if (results.statusCode === 200) {
        return true;
    }
    return false;
}

/**
 * Patches a record's visibility to 0, hiding it and deleting its children.
 * @param recordID 
 */
async function recordDelete(recordID: string): Promise<boolean> {
    const uriHelper = createAPIHelper({
        baseURL: currentUrl
    });
    const queryEtag = await uriHelper.get<IAPIDefaultFields>({
        endpoint: "data",
        itemID: recordID,
        token: customWindow.initialData
    });
    if (!queryEtag) {
        return false;
    }
    return await patchVisibility(uriHelper, {
        body: { visibility: "0" },
        endpoint: "data",
        etag: queryEtag._etag,
        itemID: recordID,
        token: customWindow.initialData
    });
}

/**
 * Function that queries a collection for all a user's records,
 * also fetches details about their children.
 * @param opts Request options.
 */
async function getUploaded(
    opts: IAPIHelperOptions
): Promise<Array<IDataResult & IAPIDefaultFields> | undefined> {
    const apiHelper = createAPIHelper({ baseURL: currentUrl });
    const dataResults = await apiHelper.get<IDataResultItems | undefined>(opts);

    if (!dataResults) {
        return;
    }

    let collectionMapper:IMapThing = {};
    dataResults._items.forEach(result => {
        if (result.children) {
            collectionMapper = mapChildren(result.children);
        }
    });

    const childPromises: Array<
        Promise<Array<IChildResult & IAPIDefaultFields> | undefined>
    > = [];
    Object.keys(collectionMapper).forEach(collection => {
        const queryOptions = {
            endpoint: collection,
            headers: {
                Authorization: `Bearer ${customWindow.initialData}`
            },
            json: true,
            method: "GET",
            qs: {
                projection: `{"record_id": 1, "validation_errors": 1}`,
                where: `{"_id": {"$in": [${collectionMapper[
                    collection
                ].toString()}]}`
            },
            uri: `${currentUrl}/api/data`
        };
        childPromises.push(
            apiHelper.get<Array<IChildResult & IAPIDefaultFields> | undefined>(
                queryOptions
            )
        );
    });

    const childResults = await Promise.all(childPromises);
    if (!childResults) {
        return;
    }

    // Look for a way to get rid of this, its only purpose is to remove null values
    // that should not be there in the first place.
    const flatChildArray: IChildResult[] = [];
    childResults.forEach(child => {
        if (child) {
            flatChildArray.push(...child);
        }
        return;
    });

    dataResults._items.forEach((result: IDataResult) => {
        // Map the children and their validation errors to their parents.
        flatChildArray.forEach(child => {
            if (result.children && child.record_id === result._id) {
                result.children.forEach(dataChild => {
                    if (dataChild._id === child._id) {
                        dataChild.validation_errors = child.validation_errors;
                    }
                });
            }
        });
    });
    return dataResults._items;
}

export { makeRequest, recordDelete, getUploaded };
