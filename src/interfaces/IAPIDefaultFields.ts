import { Response } from "request";

interface IAPIDefaultFields extends Response {
    _id: string;
    _etag?: string;
    _updated?: string;
    trial?: string;
    assay?: string;
};

export default IAPIDefaultFields;