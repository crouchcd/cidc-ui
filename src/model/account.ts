// tslint:disable-next-line:interface-name
export interface Account {
    _id: string;
    _etag: string;
    username: string;
    email: string;
    role: string;
    approved: boolean;
    last_access: string;
    first_n: string;
    last_n: string;
    organization: string;
    position_description: string;
    registration_submit_date: string;
}
