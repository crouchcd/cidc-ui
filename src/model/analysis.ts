// tslint:disable-next-line:interface-name
export interface Analysis {
    _id: string;
    start_date: string;
    end_date: string;
    experimental_strategy: string;
    trial_name: string;
    status: string;
    files_used: any[];
    files_generated: any[];
    snakemake_log_tails: string[];
    error_message: string;
}
