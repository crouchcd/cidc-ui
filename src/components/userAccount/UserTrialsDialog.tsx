import * as React from "react";
import {
    Dialog,
    FormGroup,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TablePagination
} from "@material-ui/core";
import autobind from "autobind-decorator";
import { getTrials } from "src/api/api";
import { Trial } from "src/model/Trial";

export default class UserTrialsDialog extends React.Component<any, {}> {
    state = {
        selectedTrialIds: [],
        trials: undefined,
        page: 0,
        rowsPerPage: 10
    };

    componentDidUpdate(prevProps: any) {
        if (this.props.open && !prevProps.open) {
            this.setState({ trials: undefined });
            getTrials(this.props.token).then(results => {
                const userTrials: string[] = [];
                results.forEach(trial => {
                    if (
                        trial.collaborators.includes(
                            this.props.account.username
                        )
                    ) {
                        userTrials.push(trial.trial_name);
                    }
                });
                this.setState({
                    trials: results,
                    selectedTrialIds: userTrials
                });
            });
        }
    }

    @autobind
    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(event.target.value);
    }

    @autobind
    private handleCancel() {
        this.props.onCancel();
    }

    @autobind
    private handleSave() {
        console.log("test");
    }

    @autobind
    private handleChangePage(
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number
    ) {
        this.setState({ page });
    }

    @autobind
    private handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        this.setState({ rowsPerPage: Number(event.target.value) });
    }

    public render() {
        return (
            <>
                <Dialog open={this.props.open} onClose={this.handleCancel}>
                    <DialogTitle id="confirmation-dialog-title">
                        Select Trials
                    </DialogTitle>
                    {!this.state.trials && (
                        <div className="User-account-progress">
                            <CircularProgress />
                        </div>
                    )}
                    <DialogContent>
                        {this.state.trials && (
                            <div>
                                <Table>
                                    <TableBody>
                                        {this.state.trials
                                            .slice(
                                                this.state.page *
                                                    this.state.rowsPerPage,
                                                this.state.page *
                                                    this.state.rowsPerPage +
                                                    this.state.rowsPerPage
                                            )
                                            .map((trial: Trial) => {
                                                return (
                                                    <TableRow key={trial._id}>
                                                        <TableCell
                                                            style={{
                                                                fontSize: 18
                                                            }}
                                                        >
                                                            <FormControlLabel
                                                                key={trial._id}
                                                                label={
                                                                    trial.trial_name
                                                                }
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.selectedTrialIds.includes(
                                                                            trial.trial_name
                                                                        )}
                                                                        value={
                                                                            trial._id
                                                                        }
                                                                        onChange={
                                                                            this
                                                                                .handleChange
                                                                        }
                                                                    />
                                                                }
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    rowsPerPageOptions={[5, 10, 25]}
                                    count={this.state.trials.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={
                                        this.handleChangeRowsPerPage
                                    }
                                />
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}
