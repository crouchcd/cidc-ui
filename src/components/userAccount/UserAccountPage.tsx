import * as React from "react";
import {
    Toolbar,
    Typography,
    Paper,
    CircularProgress
} from "@material-ui/core";
import "./UserAccount.css";
import { AccountInfo } from "../../model/AccountInfo";
import { Trial } from "../../model/Trial";
import { getAccountInfo, getTrials } from "../../api/api";
import autobind from "autobind-decorator";

export interface IUserAccountPageState {
    accountInfo: AccountInfo | undefined;
    trials: Trial[] | undefined;
    accountInfoError: string | undefined;
    trialsError: string | undefined;
}

export default class UserAccountPage extends React.Component<
    any,
    IUserAccountPageState
> {
    state: IUserAccountPageState = {
        accountInfo: undefined,
        trials: undefined,
        accountInfoError: undefined,
        trialsError: undefined
    };

    componentDidMount() {
        if (this.props.token) {
            this.getUserData();
        }
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.token !== prevProps.token) {
            this.getUserData();
        }
    }

    @autobind
    private getUserData() {
        getAccountInfo(this.props.token)
            .then(results => {
                this.setState({ accountInfo: results![0] });
            })
            .catch(error => {
                this.setState({ accountInfoError: error.message });
            });

        getTrials(this.props.token)
            .then(results => {
                this.setState({ trials: results });
            })
            .catch(error => {
                this.setState({ trialsError: error.message });
            });
    }

    public render() {
        if (!this.props.auth.checkAuth(this.props.location.pathname)) {
            return null;
        }

        return (
            <div className="Content">
                <Paper className="User-account-paper">
                    <Toolbar className="User-account-toolbar">
                        <Typography className="User-account-toolbar-text">
                            User Account
                        </Typography>
                    </Toolbar>
                    <div className="User-details">
                        {!this.state.accountInfoError &&
                            !this.state.trialsError &&
                            !this.state.accountInfo &&
                            !this.state.trials && (
                                <div className="User-account-progress">
                                    <CircularProgress />
                                </div>
                            )}
                        {this.state.accountInfoError && (
                            <div className="User-account-progress">
                                <Typography style={{ fontSize: 18 }}>
                                    {this.state.accountInfoError}
                                </Typography>
                            </div>
                        )}
                        {!this.state.accountInfoError &&
                            this.state.accountInfo && (
                                <div>
                                    <Typography variant="h5">
                                        Registration Form and Code of Conduct:
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="secondary"
                                        paragraph={true}
                                    >
                                        {
                                            this.state.accountInfo
                                                .registration_submit_date
                                        }
                                    </Typography>
                                </div>
                            )}
                        {this.state.trialsError && (
                            <div className="User-account-progress">
                                <Typography style={{ fontSize: 18 }}>
                                    {this.state.trialsError}
                                </Typography>
                            </div>
                        )}
                        {!this.state.trialsError && this.state.trials && (
                            <div>
                                {this.state.trials.length > 0 && (
                                    <div>
                                        <Typography variant="h5">
                                            Trials you are assigned to:
                                        </Typography>
                                        {this.state.trials.map(trial => {
                                            return (
                                                <Typography
                                                    variant="h6"
                                                    color="secondary"
                                                    key={trial._id}
                                                >
                                                    <li>{trial.trial_name}</li>
                                                </Typography>
                                            );
                                        })}
                                    </div>
                                )}
                                {this.state.trials.length === 0 && (
                                    <Typography variant="h5">
                                        You are not assigned to any trials.
                                    </Typography>
                                )}
                            </div>
                        )}
                    </div>
                </Paper>
            </div>
        );
    }
}
