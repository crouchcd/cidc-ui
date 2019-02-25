import { createAPIHelper } from "./utilities";
import { File } from "../model/File";
import { Account } from "../model/Account";
import { Trial } from "../model/Trial";

const apiHelper = createAPIHelper();

async function getFiles(token: string): Promise<File[] | undefined> {
    const options = {
        endpoint: "data",
        json: true,
        token
    };

    const result = await apiHelper.get<{ _items: File[] }>(options);

    if (!result) {
        return;
    }

    return result._items;
}

async function getSingleFile(
    token: string,
    itemID: string
): Promise<File | undefined> {
    const options = {
        endpoint: "data",
        json: true,
        itemID,
        token
    };

    const result = await apiHelper.get<File>(options);

    if (!result) {
        return;
    }

    return result;
}

async function getAccountInfo(token: string): Promise<Account[] | undefined> {
    const options = {
        endpoint: "accounts_info",
        json: true,
        token
    };

    const result = await apiHelper.get<{ _items: Account[] }>(options);

    if (!result) {
        return;
    }

    return result._items;
}

async function getTrials(token: string): Promise<Trial[] | undefined> {
    const options = {
        endpoint: "trials",
        json: true,
        token
    };

    const result = await apiHelper.get<{ _items: Trial[] }>(options);

    if (!result) {
        return;
    }

    return result._items;
}

async function registerUser(
    token: string,
    itemID: string,
    etag: string,
    newUser: any
): Promise<Account | undefined> {
    const options = {
        endpoint: "accounts_update",
        json: true,
        token,
        body: newUser,
        itemID,
        etag
    };

    const result = await apiHelper.patch<Account>(options);

    if (!result) {
        return;
    }

    return result;
}

async function getAllAccounts(token: string): Promise<Account[] | undefined> {
    const options = {
        endpoint: "accounts",
        json: true,
        token
    };

    const result = await apiHelper.get<{ _items: Account[] }>(options);

    if (!result) {
        return;
    }

    return result._items;
}

export {
    getFiles,
    getSingleFile,
    getAccountInfo,
    getTrials,
    registerUser,
    getAllAccounts
};
