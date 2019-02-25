import * as React from "react";
import {
    Paper,
    Toolbar,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Button,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    CircularProgress
} from "@material-ui/core";
import { getAllAccounts } from "../../api/api";
import autobind from "autobind-decorator";
import { Account } from "src/model/Account";
import UserTableRow from "./UserTableRow";

export default class AdminMenu extends React.Component<any, {}> {
    state = {
        accounts: undefined,
        page: 0,
        rowsPerPage: 10
    };

    componentDidMount() {
        getAllAccounts(this.props.token).then(results => {
            this.setState({ accounts: results });
        });
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
            <div style={{ marginTop: 20 }}>
                <Paper className="User-account-paper">
                    <Toolbar className="User-account-toolbar">
                        <Typography className="User-account-toolbar-text">
                            Admin Tasks
                        </Typography>
                    </Toolbar>
                    {!this.state.accounts && (
                        <div className="User-account-progress">
                            <CircularProgress />
                        </div>
                    )}
                    {this.state.accounts && (
                        <div>
                            <Table>
                                <TableBody>
                                    {this.state.accounts
                                        .slice(
                                            this.state.page *
                                                this.state.rowsPerPage,
                                            this.state.page *
                                                this.state.rowsPerPage +
                                                this.state.rowsPerPage
                                        )
                                        .map((account: Account) => {
                                            return (
                                                <TableRow key={account._id}>
                                                    <UserTableRow
                                                        account={account}
                                                    />
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                rowsPerPageOptions={[5, 10, 25]}
                                count={this.state.accounts.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={
                                    this.handleChangeRowsPerPage
                                }
                            />
                        </div>
                    )}
                </Paper>
            </div>
        );
    }
}
