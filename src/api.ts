import { UriOptions } from "request";
import * as request from "request-promise-native";
import { ITableData, ITableResult } from "./StatusTable";

interface ICustomWindow extends Window {
  initialData?: string;
}

const customWindow: ICustomWindow = window;

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

// Simple http request function.
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

const getOlink = (
  opts: UriOptions & request.RequestPromiseOptions
): Promise<IOlinkResT | undefined> => {
  return makeRequest<IOlinkResT | undefined>(opts);
};

const reqOptions = {
  headers: {
    Authorization: `Bearer ${customWindow.initialData}`
  },
  json: true,
  method: "GET",
  qs: {},
  uri: "https://lmportal.cimac-network.org:443/api/data"
};

async function getFormatted(
  opts: UriOptions & request.RequestPromiseOptions
): Promise<ITableData[] | undefined> {
  // tslint:disable-next-line:no-console
  const olinkResults = await getOlink(opts).catch(e => console.log(e));
  if (!olinkResults) {
    return;
  }
  const ids = olinkResults._items.map(item => item.record_id);
  const olinkMap = {};
  olinkResults._items.forEach(ol => {
    olinkMap[ol.record_id] = ol;
  });
  reqOptions.qs = {
    where: `{"_id": "[${ids.toString()}]"}`,
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

export { makeRequest, getOlink, getFormatted };
