import * as React from 'react';
import ReactMarkdown from "react-markdown";
import 'github-markdown-css/github-markdown.css';
import { MARKDOWN_FOLDER_PATH } from "../../util/Constants";
import { Paper, Toolbar, Typography, Button, TextField, Grid } from '@material-ui/core';
import "./TransferData.css";
import CopyToClipboard from 'react-copy-to-clipboard';

export interface ICliInstructionsState {
    markdown: string;
    tokenVisible: boolean;
}

const MARKDOWN_FILE_NAME: string = "cidc-cli/master/README.md";
const NUMBER_OF_LINES_TO_REMOVE = 4;

export default class CliInstructions extends React.Component<any, ICliInstructionsState> {

    state: ICliInstructionsState = {
        markdown: "",
        tokenVisible: false
    }

    componentWillMount() {
        fetch(MARKDOWN_FOLDER_PATH + MARKDOWN_FILE_NAME)
            .then((response) => response.text()).then((text) => {
                const filteredText: string[] = text.split('\n').slice(NUMBER_OF_LINES_TO_REMOVE);
                this.setState({ markdown: filteredText.join('\n') });
            });
    }

    private handleClick() {
        this.setState({ tokenVisible: !this.state.tokenVisible });
    }

    public render() {

        if(!this.props.auth.checkAuth(this.props.location.pathname)) {
            return null;
        }

        return (
            <div className="Markdown-width">
                <ReactMarkdown source={this.state.markdown} className="markdown-body" />
                <Paper className="User-account-paper" style={{ marginTop: 20 }}>
                    <Toolbar className="User-account-toolbar">
                        <Typography className="User-account-toolbar-text">
                            JWT For logging into CLI
                        </Typography>
                    </Toolbar>
                    <div className="User-details">
                        <div>
                            <Typography style={{ fontSize: 18 }}>
                                After you've installed the CLI and are ready to upload data,
                                paste the JWT below into the jwt_login command to authenticate yourself.
                            </Typography>
                            <div style={{ backgroundColor: 'black', padding: 10, marginTop: 10, borderRadius: 5 }}>
                                <Typography style={{ color: 'white', fontFamily: 'Monaco' }}>(Cmd) jwt_login ey927853.......</Typography>
                            </div>
                            <div style={{
                                backgroundColor: '#ffe8e6', padding: 10, marginTop: 10, borderRadius: 5,
                                borderColor: '#db2828', borderWidth: 1, borderStyle: 'solid'
                            }}>
                                <Typography style={{ color: '#db2828' }} paragraph={true}>
                                    Your JWT is a long token that represents
                                    your identity within the CIDC System, Treat it as you would a password! Anyone who has your JWT can
                                    perform actions as if they were you.
                                </Typography>
                                <Typography style={{ color: '#db2828' }} paragraph={true}>
                                    Do not share your JWT with anyone! We will never ask you to send a JWT over email.
                                </Typography>
                                <Button variant="contained" color="secondary"
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => this.handleClick()}>
                                    Click to reveal the JWT that you will paste in the above command
                                </Button>
                                {this.state.tokenVisible &&
                                    <div style={{ marginTop: 10 }}>
                                        <Grid container={true} spacing={8}>
                                            <Grid item={true} >
                                                <CopyToClipboard text={this.props.auth.getIdToken()}>
                                                    <Button variant="contained" color="primary">
                                                        Copy JWT to Clipboard
                                                    </Button>
                                                </CopyToClipboard>
                                            </Grid>
                                            <Grid item={true} >
                                                <div className="Token-input-border">
                                                    <TextField
                                                        defaultValue={this.props.auth.getIdToken()}
                                                        margin="none"
                                                        variant="outlined"
                                                        style={{ backgroundColor: 'white', height: 36 }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}
