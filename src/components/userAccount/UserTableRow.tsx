import * as React from "react";
import {
    TableCell,
    Button,
    FormControl,
    Select,
    MenuItem
} from "@material-ui/core";
import autobind from "autobind-decorator";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

export default class AdminMenu extends React.Component<any, {}> {
    state = {
        role: this.props.account.role,
        saveDisabled: true
    };

    private handleDelete() {
        console.log("delete " + this.props.account._id);
    }

    private handleSave() {
        console.log("save " + this.props.account._id);
    }

    private openTrials() {
        console.log("save " + this.props.account._id);
    }

    @autobind
    private handleRoleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ role: event.target.value, saveDisabled: false });
    }

    public render() {
        return (
            <>
                <TableCell style={{ fontSize: 16 }}>
                    {this.props.account.email}
                </TableCell>
                <TableCell>
                    <FormControl style={{ minWidth: 120, marginRight: 20 }}>
                        <Select
                            value={this.state.role}
                            onChange={this.handleRoleChange}
                        >
                            <MenuItem value="registrant">Registrant</MenuItem>
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
                <TableCell>
                    <Button
                        variant="outlined"
                        color="primary"
                        // tslint:disable-next-line:jsx-no-lambda
                        onClick={() => this.openTrials()}
                    >
                        View / Edit Trials
                        <EditIcon style={{ marginLeft: 10 }} />
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button
                        variant="outlined"
                        color="secondary"
                        // tslint:disable-next-line:jsx-no-lambda
                        onClick={() => this.handleDelete()}
                    >
                        Delete
                        <DeleteIcon style={{ marginLeft: 10 }} />
                    </Button>
                </TableCell>
            </>
        );
    }
}
