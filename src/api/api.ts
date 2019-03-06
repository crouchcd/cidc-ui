import { createAPIHelper } from "./utilities";
import { File } from "../model/file";
import { Account } from "../model/account";
import { Trial } from "../model/trial";
import { Analysis } from "../model/analysis";

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

async function createUser(
    token: string,
    newUser: any
): Promise<Account | undefined> {
    const options = {
        endpoint: "accounts_create",
        json: true,
        token,
        body: newUser
    };

    const result = await apiHelper.post<Account>(options);

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

async function updateRole(
    token: string,
    itemID: string,
    etag: string,
    role: string
): Promise<Account | undefined> {
    const options = {
        endpoint: "accounts",
        json: true,
        token,
        body: { role, approved: "true" },
        itemID,
        etag
    };

    const result = await apiHelper.patch<Account>(options);

    if (!result) {
        return;
    }

    return result;
}

async function deleteUser(
    token: string,
    itemID: string,
    etag: string
): Promise<Account | undefined> {
    const options = {
        endpoint: "accounts",
        json: true,
        token,
        itemID,
        etag
    };

    const result = await apiHelper.delete<Account>(options);

    if (!result) {
        return;
    }

    return result;
}

async function updateTrial(
    token: string,
    itemID: string,
    etag: string,
    collaborators: any
): Promise<Trial | undefined> {
    const options = {
        endpoint: "trials",
        json: true,
        token,
        body: { collaborators },
        itemID,
        etag
    };

    const result = await apiHelper.patch<Trial>(options);

    if (!result) {
        return;
    }

    return result;
}

async function getAnalyses(token: string): Promise<Analysis[] | undefined> {
    const options = {
        endpoint: "analysis",
        json: true,
        token
    };

    const result = await apiHelper.get<{ _items: Analysis[] }>(options);

    if (!result) {
        return;
    }

    return result._items;
}

async function getUserEtag(
    token: string,
    itemID: string
): Promise<string | undefined> {
    const options = {
        endpoint: "accounts",
        json: true,
        itemID,
        token
    };

    const result = await apiHelper.get<{ _etag: string }>(options);

    if (!result) {
        return;
    }

    return result._etag;
}

export {
    getFiles,
    getSingleFile,
    getAccountInfo,
    getTrials,
    createUser,
    getAllAccounts,
    updateRole,
    deleteUser,
    updateTrial,
    getAnalyses,
    getUserEtag
};
