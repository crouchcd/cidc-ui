import * as React from "react";
import {
    TableCell,
    Button,
    FormControl,
    Select,
    MenuItem,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@material-ui/core";
import autobind from "autobind-decorator";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import UserTrialsDialog from "./UserTrialsDialog";

export default class AdminMenu extends React.Component<any, {}> {
    state = {
        role: this.props.account.role,
        saveDisabled: true,
        trialsDialogOpen: false,
        deleteDialogOpen: false
    };

    private openDeleteDialog() {
        this.setState({ deleteDialogOpen: true });
    }

    private handleSave() {
        console.log("save " + this.props.account._id);
    }

    private openTrials() {
        this.setState({ trialsDialogOpen: true });
    }

    @autobind
    private handleRoleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ role: event.target.value, saveDisabled: false });
    }

    @autobind
    private handleTrialCancel() {
        this.setState({ trialsDialogOpen: false });
    }

    @autobind
    private handleDeleteCancel() {
        this.setState({ deleteDialogOpen: false });
    }

    @autobind
    private handleDeleteUser() {
        this.props.onDeleteUser();
    }

    public render() {
        return (
            <>
                <TableCell style={{ fontSize: 18 }}>
                    {this.props.account.email}
                </TableCell>
                <TableCell align="right">
                    <FormControl style={{ minWidth: 120, marginRight: 20 }}>
                        <Select
                            value={this.state.role}
                            onChange={this.handleRoleChange}
                        >
                            {this.props.account.role === "registrant" && (
                                <MenuItem value="registrant">
                                    Registrant
                                </MenuItem>
                            )}
                            <MenuItem value="reader">Reader</MenuItem>
                            <MenuItem value="uploader">Uploader</MenuItem>
                            <MenuItem value="lead">Lead</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="developer">Developer</MenuItem>
                            <MenuItem value="disabled">Disabled</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={this.state.saveDisabled}
                        // tslint:disable-next-line:jsx-no-lambda
                        onClick={() => this.handleSave()}
                    >
                        Save
                        <SaveIcon style={{ marginLeft: 10 }} />
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button
                        variant="outlined"
                        color="primary"
                        // tslint:disable-next-line:jsx-no-lambda
                        onClick={() => this.openTrials()}
                    >
                        View / Edit Trials
                        <EditIcon style={{ marginLeft: 10 }} />
                    </Button>
                    <UserTrialsDialog
                        open={this.state.trialsDialogOpen}
                        account={this.props.account}
                        token={this.props.token}
                        onCancel={this.handleTrialCancel}
                    />
                </TableCell>
                <TableCell align="right">
                    <Button
                        variant="outlined"
                        color="secondary"
                        // tslint:disable-next-line:jsx-no-lambda
                        onClick={() => this.openDeleteDialog()}
                    >
                        Delete
                        <DeleteIcon style={{ marginLeft: 10 }} />
                    </Button>
                    <Dialog
                        open={this.state.deleteDialogOpen}
                        onClose={this.handleDeleteCancel}
                    >
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete the account of{" "}
                                {this.props.account.email}?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.handleDeleteCancel}
                                color="primary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={this.handleDeleteUser}
                                color="primary"
                            >
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableCell>
            </>
        );
    }
}
