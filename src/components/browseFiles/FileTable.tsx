import { TablePagination, TableSortLabel } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import autobind from 'autobind-decorator';
import filesize from 'filesize';
import _ from 'lodash';
import * as React from 'react';
import { File } from "../../model/File";

const NAME_KEY = "name";
const TRIAL_ID_KEY = "trialId";
const EXPERIMENTAL_STRATEGY_KEY = "experimentalStrategy";
const NUMBER_OF_CASES_KEY = "numberOfCases";
const DATA_FORMAT_KEY = "dataFormat";
const SIZE_KEY = "size";

export interface IFileTableProps {
    files: File[];
}

export interface IFileTableState {
    rowsPerPage: number;
    page: number;
    sortBy: string;
    sortDirection: "asc" | "desc";
}

export default class FileTable extends React.Component<IFileTableProps, IFileTableState> {

    state: IFileTableState = {
        page: 0,
        rowsPerPage: 10,
        sortBy: NAME_KEY,
        sortDirection: "asc"
    }

    public render() {
        return (
            <div className="File-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel active={this.state.sortBy === NAME_KEY}
                                    direction={this.state.sortDirection}
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => this.handleChangeSorting(NAME_KEY)}>
                                    File Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel active={this.state.sortBy === TRIAL_ID_KEY}
                                    direction={this.state.sortDirection}
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => this.handleChangeSorting(TRIAL_ID_KEY)}>
                                    Trial ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel active={this.state.sortBy === EXPERIMENTAL_STRATEGY_KEY}
                                    direction={this.state.sortDirection}
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => this.handleChangeSorting(EXPERIMENTAL_STRATEGY_KEY)}>
                                    Experimental Strategy
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel active={this.state.sortBy === NUMBER_OF_CASES_KEY}
                                    direction={this.state.sortDirection}
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => this.handleChangeSorting(NUMBER_OF_CASES_KEY)}>
                                    # of Cases
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel active={this.state.sortBy === DATA_FORMAT_KEY}
                                    direction={this.state.sortDirection}
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => this.handleChangeSorting(DATA_FORMAT_KEY)}>
                                    Data Format
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel active={this.state.sortBy === SIZE_KEY}
                                    direction={this.state.sortDirection}
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => this.handleChangeSorting(SIZE_KEY)}>
                                    File Size
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.orderBy(this.props.files, this.state.sortBy, this.state.sortDirection).slice(
                            this.state.page * this.state.rowsPerPage,
                            this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(file => {
                                return (
                                    <TableRow key={file._id}>
                                        <TableCell>{file.file_name}</TableCell>
                                        <TableCell>{file.trial_name}</TableCell>
                                        <TableCell>{file.experimental_strategy}</TableCell>
                                        <TableCell>{file.number_of_samples}</TableCell>
                                        <TableCell>{file.data_format}</TableCell>
                                        <TableCell>{filesize(file.file_size)}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25]}
                    count={this.props.files.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }

    @autobind
    private handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, page: number) {
        this.setState({ page });
    }

    @autobind
    private handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ rowsPerPage: Number(event.target.value) });
    }

    private handleChangeSorting(sortBy: string) {
        const isAsc = this.state.sortBy === sortBy && this.state.sortDirection === 'asc';
        this.setState({ sortBy, sortDirection: isAsc ? 'desc' : 'asc' });
    }
}
