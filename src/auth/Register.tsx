import * as React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import autobind from "autobind-decorator";
import "./Register.css";
import { getAccountInfo } from "src/api/api";

export default class Register extends React.Component<any, {}> {
    state = {
        userinfo: undefined,
        organization: undefined
    };

    componentDidMount() {
        this.props.auth.auth0.checkSession({}, (error, authResult) => {
            getAccountInfo(authResult.idToken).then(results => {
                if (results[0].role !== "registrant") {
                    this.props.history.replace("/");
                } else {
                    this.props.auth.auth0.client.userInfo(
                        authResult.accessToken,
                        (err, userinfo) => {
                            this.setState({ userinfo });
                        }
                    );
                }
            });
        });
    }

    @autobind
    private handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ userinfo: { given_name: event.target.value } });
    }

    @autobind
    private handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ userinfo: { family_name: event.target.value } });
    }

    @autobind
    private handleOrganizationChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        this.setState({ organization: event.target.value });
    }

    private handleClick() {
        console.log(this.state);
    }

    public render() {
        if (!this.state.userinfo) {
            return null;
        }

        return (
            <div>
                <div className="Register-header">Registration</div>
                <div style={{ width: "25%", margin: "auto", paddingTop: 25 }}>
                    <Grid container={true} spacing={16}>
                        <Grid item={true} xs={12}>
                            <TextField
                                label="Email"
                                value={this.state.userinfo.email}
                                disabled={true}
                                fullWidth={true}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField
                                label="First Name"
                                fullWidth={true}
                                value={this.state.userinfo.given_name}
                                onChange={this.handleFirstNameChange}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField
                                label="Last Name"
                                fullWidth={true}
                                value={this.state.userinfo.family_name}
                                onChange={this.handleLastNameChange}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField
                                label="Organization"
                                fullWidth={true}
                                value={this.state.organization}
                                onChange={this.handleOrganizationChange}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => this.handleClick()}
                                >
                                    Register
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
