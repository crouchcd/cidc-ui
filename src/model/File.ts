// tslint:disable-next-line:interface-name
export interface File {
    _id: string;
    file_name: string;
    trial_name: string;
    experimental_strategy: string;
    number_of_samples: number;
    data_format: string;
    file_size: number;
    date_created: string;
    gs_uri: string;
}
