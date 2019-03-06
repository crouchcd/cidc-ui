// tslint:disable-next-line:interface-name
export interface FastqProperties {
    patient_id: string;
    timepoint: number;
    timepoint_unit: string;
    batch_id: string;
    instrument_model: string;
    read_length: number;
    avg_insert_size: number;
    sample_id: string;
    sample_type: string;
    pair_label: string;
}
