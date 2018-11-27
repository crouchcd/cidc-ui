import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';

interface IValidationError {
    affected_paths: string[]
    explanation: string,
    raw_or_parse: 'RAW' | 'PARSE',
    severity: 'WARNING' | 'CRITICAL'
}

interface ISampleSchema {
    sample_id: string,
    qc_status: string,
    plate_id: string
}

interface IOlinkSample {
    sample_id: string,
    value: number,
    qc_fail: boolean,
    below_lod: boolean
}

interface IOlinkAssay {
    assay: string,
    uniprot_id: string,
    panel: string,
    lod: number,
    missing_data_freq: number,
    results: IOlinkSample[]
}

interface ITableResult {
    _id: string,
    validation_errors?: IValidationError[],
    ol_panel_type: string,
    npx_m_ver: string,
    samples: ISampleSchema[],
    ol_assay: IOlinkAssay,
    trial: string,
    record_id: string,
    assay: string
}

interface ITableData extends ITableResult {
    file_name: string,
}

interface ITableProps {
    _items: ITableData[]|undefined
}


const StatusTable: React.SFC<ITableProps> = (props) => {
    if (props._items) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File ID</TableCell>
                        <TableCell>File Name</TableCell>
                        <TableCell>Validation Errors</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props._items.map(row => {
                        return (
                            <TableRow key={row._id}>
                                <TableCell>
                                    {row._id}
                                </TableCell>
                                <TableCell>
                                    {row.file_name}
                                </TableCell>
                                <TableCell>
                                    {row.validation_errors ? JSON.stringify(row.validation_errors) : ''}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
                }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>File ID</TableCell>
                    <TableCell>File Name</TableCell>
                    <TableCell>Validation Errors</TableCell>
                </TableRow>
            </TableHead>
        </Table>
    );
}

export {
    StatusTable,
    IValidationError,
    ITableProps,
    ITableData,
    ITableResult
};