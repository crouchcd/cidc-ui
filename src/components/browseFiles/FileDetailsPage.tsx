import * as React from 'react';
import autobind from 'autobind-decorator';
import { getSingleFile } from "../../api/api";
import { File } from "../../model/File";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, CircularProgress, Grid, Button } from '@material-ui/core';
import filesize from 'filesize';

export interface IFileDetailsPageState {
    file: File | undefined;
    error: string | undefined;
}


export default class FileDetailsPage extends React.Component<any, IFileDetailsPageState> {

    state: IFileDetailsPageState = {
        file: undefined,
        error: undefined
    }

    componentDidMount() {
        if (this.props.token) {
            this.getFile();
        }
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.token !== prevProps.token) {
            this.getFile();
        }
    }

    @autobind
    private getFile() {
        getSingleFile(this.props.token, this.props.match.params.fileId)
            .then(result => {
                this.setState({ file: result });
            }).catch(error => {
                this.setState({ error: error.message })
            });
    }

    public render() {

        if (!this.props.auth.checkAuth(this.props.location.pathname)) {
            return null;
        }

        return (
            <div className="Browse-files-page">
                {this.state.error &&
                    <div className="Browse-files-progress">
                        <Typography style={{ fontSize: 18 }}>{this.state.error}</Typography>
                    </div>
                }
                {!this.state.error && !this.state.file &&
                    <div className="Browse-files-progress">
                        <CircularProgress />
                    </div>
                }
                {!this.state.error && this.state.file &&
                    <Grid container={true} spacing={32}>
                        <Grid item={true} xs={5}>
                            <Grid container={true} spacing={32}>
                                <Grid item={true} xs={7}>
                                    <Typography variant="h5" gutterBottom={true}>Core File Properties:</Typography>
                                </Grid>
                                <Grid item={true} xs={5}>
                                    <Button variant="contained" color="primary" href={this.state.file.gs_uri}>
                                        Download
                                    </Button>
                                </Grid>
                            </Grid>
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
                                        <TableCell>{this.state.file.file_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>File ID</TableCell>
                                        <TableCell>{this.state.file._id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Trial Name</TableCell>
                                        <TableCell>{this.state.file.trial_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Experimental Strategy</TableCell>
                                        <TableCell>{this.state.file.experimental_strategy}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Number of Samples</TableCell>
                                        <TableCell>{this.state.file.number_of_samples}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Data Format</TableCell>
                                        <TableCell>{this.state.file.data_format}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>File Size</TableCell>
                                        <TableCell>{filesize(this.state.file.file_size)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Data Upload Timestamp</TableCell>
                                        <TableCell>{this.state.file.date_created}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                }
            </div>
        );
    }
}
