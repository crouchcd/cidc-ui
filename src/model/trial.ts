// tslint:disable-next-line:interface-name
export interface Trial {
    _id: string;
    _etag: string;
    trial_name: string;
    collaborators: string[];
    locked: boolean;
}
