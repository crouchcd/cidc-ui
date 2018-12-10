import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import DeleteButton from "./DeleteButton";

interface IValidationError {
    affected_paths: string[];
    explanation: string;
    raw_or_parse: "RAW" | "PARSE";
    severity: "WARNING" | "CRITICAL";
}

interface ISampleSchema {
    sample_id: string;
    qc_status: string;
    plate_id: string;
}

interface IOlinkSample {
    sample_id: string;
    value: number;
    qc_fail: boolean;
    below_lod: boolean;
}

interface IOlinkAssay {
    assay: string;
    uniprot_id: string;
    panel: string;
    lod: number;
    missing_data_freq: number;
    results: IOlinkSample[];
}

interface ITableResult {
    _id: string;
    validation_errors?: IValidationError[];
    ol_panel_type: string;
    npx_m_ver: string;
    samples: ISampleSchema[];
    ol_assay: IOlinkAssay;
    trial: string;
    record_id: string;
    assay: string;
}

interface ITableData extends ITableResult {
    file_name: string;
}

interface IUploadStatusProps {
    _items: ITableData[] | undefined;
    deleteFunction(fileID: string): void;
}

const UploadStatus: React.SFC<IUploadStatusProps> = props => {
    if (props._items) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell>File ID</TableCell>
                        <TableCell>Validation Errors</TableCell>
                        <TableCell>Delete File</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props._items.map(row => {
                        return (
                            <TableRow key={row._id}>
                                <TableCell>{row.file_name}</TableCell>
                                <TableCell>{row._id}</TableCell>
                                <TableCell>
                                    {row.validation_errors
                                        ? JSON.stringify(row.validation_errors)
                                        : ""}
                                </TableCell>
                                <DeleteButton
                                    {...{
                                        deleteRecord: props.deleteFunction,
                                        fileID: row.record_id
                                    }}
                                >
                                    Delete
                                </DeleteButton>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    } else {
        return <div>...Loading (or not Found)</div>;
    }
};

export { UploadStatus, IValidationError, IUploadStatusProps, ITableData, ITableResult };
