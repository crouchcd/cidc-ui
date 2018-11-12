import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';

interface ITableData {
    id: string,
    file_name: string,
}
interface ITableProps {
    rows: ITableData[]
}

const StatusTable: React.SFC<ITableProps> = (props) => {
    // tslint:disable-next-line:no-console
    console.log(typeof props)
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>File ID</TableCell>
                    <TableCell>
                            File Name
                    </TableCell>
                    <TableCell>Validation Errors</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.rows.map(row => {
                    return (
                        <TableRow key={row.id}>
                            <TableCell>
                                {row.id}
                            </TableCell>
                            <TableCell>
                                {row.file_name}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

export {
    StatusTable,
    ITableData,
    ITableProps,
};