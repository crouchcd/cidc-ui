import * as React from "react";
import {
    TextField,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    Typography
} from "@material-ui/core";
import autobind from "autobind-decorator";
import "./Register.css";
import { getAccountInfo, updateUser } from "../api/api";
import queryString from "query-string";
import { ORGANIZATION_NAME_MAP } from "../util/Constants";

export default class Register extends React.Component<any, {}> {
    state = {
        userinfo: {
            given_name: "",
            family_name: "",
            email: ""
        },
        organization: "EMPTY",
        firstNameError: false,
        lastNameError: false,
        organizationError: false,
        token: undefined,
        accountId: undefined,
        etag: undefined,
        unactivated: false
    };

    componentDidMount() {
        if (queryString.parse(this.props.location.search).unactivated) {
            this.setState({ unactivated: true });
            return;
        }

        this.props.auth.auth0.checkSession({}, (error, authResult) => {
            this.setState({ token: authResult.idToken });
            getAccountInfo(authResult.idToken).then(results => {
                if (results[0].organization) {
                    this.props.history.replace("/");
                } else {
                    this.props.auth.auth0.client.userInfo(
                        authResult.accessToken,
                        (err, userinfo) => {
                            this.setState({
                                userinfo,
                                accountId: results[0]._id,
                                etag: results[0]._etag
                            });
                        }
                    );
                }
            });
        });
    }

    @autobind
    private handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            userinfo: { ...this.state.userinfo, given_name: event.target.value }
        });
    }

    @autobind
    private handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            userinfo: {
                ...this.state.userinfo,
                family_name: event.target.value
            }
        });
    }

    @autobind
    private handleOrganizationChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        this.setState({ organization: event.target.value });
    }

    private handleClick() {
        let firstNameError: boolean = false;
        let lastNameError: boolean = false;
        let organizationError: boolean = false;

        if (!this.state.userinfo.given_name) {
            firstNameError = true;
        } else {
            firstNameError = false;
        }

        if (!this.state.userinfo.family_name) {
            lastNameError = true;
        } else {
            lastNameError = false;
        }

        if (!this.state.organization || this.state.organization === "EMPTY") {
            organizationError = true;
        } else {
            organizationError = false;
        }

        this.setState({ firstNameError, lastNameError, organizationError });

        if (!firstNameError && !lastNameError && !organizationError) {
            const newUser = {
                first_n: this.state.userinfo.given_name,
                last_n: this.state.userinfo.family_name,
                organization: this.state.organization
            };

            updateUser(
                this.state.token,
                this.state.accountId,
                this.state.etag,
                newUser
            ).then(result => {
                this.setState({ unactivated: true });
            });
        }
    }

    public render() {
        if (this.state.unactivated) {
            return (
                <Typography
                    style={{
                        fontSize: 20,
                        width: "70%",
                        margin: "auto",
                        paddingTop: 25
                    }}
                >
                    Thank for you registering for the CIMAC-CIDC Data Portal. We
                    will email you when your authorization request has been
                    completed.
                </Typography>
            );
        }

        if (!this.state.userinfo.email) {
            return null;
        }

        return (
            <div>
                <div className="Register-header">Registration</div>
                <div style={{ width: "25%", margin: "auto", paddingTop: 25 }}>
                    <Typography
                        style={{ fontSize: 18, width: "100%", margin: "auto" }}
                    >
                        You are not registered to CIMAC-CIDC Data Portal. Please
                        register below:
                    </Typography>
                    <Grid container={true} spacing={16}>
                        <Grid item={true} xs={12}>
                            <TextField
                                label="Email"
                                style={{ minWidth: 420 }}
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
                                style={{ minWidth: 420 }}
                                fullWidth={true}
                                value={this.state.userinfo.given_name}
                                onChange={this.handleFirstNameChange}
                                margin="normal"
                                variant="outlined"
                                required={true}
                                error={this.state.firstNameError}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField
                                label="Last Name"
                                style={{ minWidth: 420 }}
                                fullWidth={true}
                                value={this.state.userinfo.family_name}
                                onChange={this.handleLastNameChange}
                                margin="normal"
                                variant="outlined"
                                required={true}
                                error={this.state.lastNameError}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <FormControl
                                variant="outlined"
                                required={true}
                                margin="normal"
                                error={this.state.organizationError}
                                style={{ minWidth: 420 }}
                            >
                                <InputLabel>Organization</InputLabel>
                                <Select
                                    value={this.state.organization}
                                    onChange={this.handleOrganizationChange}
                                    input={<OutlinedInput labelWidth={100} />}
                                >
                                    <MenuItem value="EMPTY">
                                        Please select
                                    </MenuItem>
                                    <MenuItem value="DFCI">
                                        {ORGANIZATION_NAME_MAP.DFCI}
                                    </MenuItem>
                                    <MenuItem value="ICAHN">
                                        {ORGANIZATION_NAME_MAP.ICAHN}
                                    </MenuItem>
                                    <MenuItem value="STANFORD">
                                        {ORGANIZATION_NAME_MAP.STANFORD}
                                    </MenuItem>
                                    <MenuItem value="MD">
                                        {ORGANIZATION_NAME_MAP.MD}
                                    </MenuItem>
                                    <MenuItem value="CIDC">
                                        {ORGANIZATION_NAME_MAP.CIDC}
                                    </MenuItem>
                                </Select>
                            </FormControl>
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
