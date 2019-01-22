import { currentUrl } from "../initialize";
import {
    createAPIHelper,
    IAPIHelperOptions,
    makeRequest
} from "./utilities";
import { File } from "../model/File";

export interface IDataResult {
    _id: string;
    file_name: string;
    trial_name: string;
    experimental_strategy: string;
    number_of_samples: number;
    data_format: string;
    file_size: number;
}

async function getUploaded(
    opts: IAPIHelperOptions
): Promise<File[] | undefined> {
    const apiHelper = createAPIHelper({ baseURL: currentUrl });
    const dataResults = await apiHelper.get<{_items: File[]}>(opts);

    if (!dataResults) {
        return;
    }

    return dataResults._items;
}

export { makeRequest, getUploaded };
