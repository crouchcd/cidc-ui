import { Response, UriOptions } from "request";
import * as request from "request-promise-native";
import {
    ITableData,
    ITableResult,
    IValidationError
} from "../components/UploadStatus";
import IAPIDefaultFields from "../interfaces/IAPIDefaultFields";
import { createAPIHelper, IAPIHelperOptions, makeRequest } from "./utilities";

interface ICustomWindow extends Window {
    initialData?: string;
}

interface ITrialResult {
    _id: string;
    file_name: string;
}

interface ITrialResults {
    _items: ITrialResult[];
}

interface IOlinkResT {
    _items: ITableResult[];
}

interface IDataChild {
    _id: string;
    resource: string;
    validation_errors?: IValidationError[]
}

interface IDataResult extends IAPIDefaultFields {
    analysis_id?: string;
    children?: IDataChild[];
    date_created: string;
    file_name: string;
    gs_uri: string;
    mapping: string;
    processed: boolean;
    sample_id?: string;
    visibility: boolean;
}

interface IChildResult extends IAPIDefaultFields {
    record_id: string;
    validation_errors: IValidationError[];
}

const customWindow: ICustomWindow = window;
const currentUrl = "";

const getOlink = (
    opts: UriOptions & request.RequestPromiseOptions
): Promise<IOlinkResT | undefined> => {
    return makeRequest<IOlinkResT | undefined>(opts);
};

const mapChildren = (children: IDataChild[]): { [key: string]: string[] } => {
    const map = {};
    children.forEach(child => {
        const { _id, resource } = child;
        resource in map ? map[resource].append(_id) : (map[resource] = [_id]);
    });
    return map;
};

async function recordDelete(recordID: string): Promise<boolean> {
    const uriHelper = createAPIHelper({
        baseURL: "https://lmportal.cimac-network.org/api"
    });
    const queryEtag = await uriHelper
        .get<IAPIDefaultFields>({
            endpoint: "data",
            itemID: recordID,
            token: customWindow.initialData
        })
        .catch(e => {
            // tslint:disable-next-line:no-console
            console.log(e);
        });

    if (!queryEtag) {
        return false;
    }

    const results = await uriHelper
        .patch<Response>({
            body: { visibility: "0" },
            endpoint: "data",
            etag: queryEtag._etag,
            itemID: recordID,
            token: customWindow.initialData
        })
        .catch(e => {
            // tslint:disable-next-line:no-console
            console.log(e);
        });
    // tslint:disable-next-line:no-console
    console.log(results, "results");
    if (!results) {
        return false;
    }
    if (results.statusCode === 200) {
        return true;
    }
    return false;
}

async function getUploaded(
    opts: IAPIHelperOptions
): Promise<IDataResult[] | undefined> {
    // query data collection and get children.
    const apiHelper = createAPIHelper({ baseURL: currentUrl });
    const dataResults = await apiHelper
        .get<IDataResult[] | undefined>(opts)
        // tslint:disable-next-line:no-console
        .catch(e => console.log(e));

    if (!dataResults) {
        return;
    }

    let collectionMapper = {};
    dataResults.forEach(result => {
        if (result.children) {
            collectionMapper = mapChildren(result.children);
        }
    });

    const childPromises: Array<Promise<IChildResult[] | undefined>> = [];
    Object.keys(collectionMapper).forEach(collection => {
        // For each endpoint containing a child, make a query
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
            apiHelper.get<IChildResult[] | undefined>(queryOptions)
        );
    });

    const childResults = await Promise.all(childPromises).catch(e =>
        // tslint:disable-next-line:no-console
        console.log(e)
    );
    if (!childResults) {
        return
    }
    // Look for a way to get rid of this, its only purpose is to remove null values
    // that should not be there in the first place.
    const flatChildArray: IChildResult[] = [];
    childResults.forEach(child => {
        if (child) {
            flatChildArray.push(...child)
        }
        return
    })

    dataResults.forEach((result: IDataResult) => {
        // Map the children and their validation errors to their parents.
        flatChildArray.forEach(child => {
            if (result.children && child.record_id === result._id) {
                result.children.forEach(dataChild => {
                    if (dataChild._id === child._id) {
                        dataChild.validation_errors = child.validation_errors
                    }
                })
            }
        })
    });
    return dataResults;
}

const reqOptions = {
    headers: {
        Authorization: `Bearer ${customWindow.initialData}`
    },
    json: true,
    method: "GET",
    qs: {},
    uri: `${currentUrl}/api/data`
};

async function getFormatted(
    opts: UriOptions & request.RequestPromiseOptions
): Promise<ITableData[] | undefined> {
    // Get olink results
    // tslint:disable-next-line:no-console
    const olinkResults = await getOlink(opts).catch(e => console.log(e));
    if (!olinkResults) {
        return;
    }

    // tslint:disable-next-line:no-console
    console.log(olinkResults);
    // Map file IDs to an array
    const ids = olinkResults._items.map(item => item.record_id);

    // Create an ID-keyed dictionary for the record IDs.
    const olinkMap = {};
    olinkResults._items.forEach(ol => {
        olinkMap[ol.record_id] = ol;
    });

    // Query for the data records that match the IDs.
    reqOptions.qs = {
        where: `{"_id": {"$in": [${ids.toString()}]}`,
        // tslint:disable-next-line:object-literal-sort-keys
        projection: `{"file_name": 1}`
    };
    // tslint:disable-next-line:no-console
    const dataResults = await makeRequest<ITrialResults | undefined>(
        reqOptions
        // tslint:disable-next-line:no-console
    ).catch(e => console.log(e));
    if (!dataResults) {
        return;
    }

    // tslint:disable-next-line:no-console
    console.log(dataResults);
    // Deep copy item to add the new field for filename.
    const fileNames = dataResults._items;
    return fileNames.map(name => {
        const matchedRecord: ITableResult = olinkMap[name._id];
        const item = {
            _id: matchedRecord._id,
            assay: matchedRecord.assay,
            file_name: name.file_name,
            npx_m_ver: matchedRecord.npx_m_ver,
            ol_assay: matchedRecord.ol_assay,
            ol_panel_type: matchedRecord.ol_panel_type,
            record_id: name._id,
            samples: matchedRecord.samples,
            trial: matchedRecord.trial,
            validation_errors: matchedRecord.validation_errors
        };
        return item;
    });
}

export { makeRequest, recordDelete, ICustomWindow, getUploaded };
