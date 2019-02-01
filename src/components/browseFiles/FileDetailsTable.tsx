import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import filesize from 'filesize';
import _ from 'lodash';
import * as React from 'react';
import { File } from "../../model/File";

export interface IFileDetailsTableProps {
    file: File;
}

export default class FileDetailsTable extends React.Component<IFileDetailsTableProps, {}> {

    public render() {
        return (
            <div className="File-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Attribute Name</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell>{this.props.file.file_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>File ID</TableCell>
                            <TableCell>{this.props.file._id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Trial Name</TableCell>
                            <TableCell>{this.props.file.trial_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Experimental Strategy</TableCell>
                            <TableCell>{this.props.file.experimental_strategy}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Number of Samples</TableCell>
                            <TableCell>{this.props.file.number_of_samples}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Data Format</TableCell>
                            <TableCell>{this.props.file.data_format}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>File Size</TableCell>
                            <TableCell>{filesize(this.props.file.file_size)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Data Upload Timestamp</TableCell>
                            <TableCell>{this.props.file.date_created}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
}
