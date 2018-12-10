import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";

interface IMessage {
    message: string;
    key: number;
}

interface INotificationState {
    open: boolean;
    messageInfo: IMessage;
}

const styles = (theme: Theme) =>
    createStyles({
        close: {
            padding: theme.spacing.unit / 2
        }
    });

class Notification extends React.Component<
    WithStyles<typeof styles>,
    INotificationState
> {
    public state: Readonly<INotificationState> = {
        messageInfo: { message: "", key: 1},
        open: false
    };
    
    private queue: IMessage[] = [];
    
    public handleClick = (message: string) => {
        this.queue.push({
            key: new Date().getTime(),
            message
        });
        if (this.state.open) {
            this.setState({ open: true });
        }
    };

    public handleClose = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ open: false });
    };

    public render() {
        const { messageInfo } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <Snackbar
                    key={messageInfo.key}
                    anchorOrigin={{
                        horizontal: "left",
                        vertical: "bottom"
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    onExited={this.handleExited}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    action={[
                        <Button
                            key="undo"
                            color="secondary"
                            size="small"
                            onClick={this.handleClose}
                        >
                            CLOSE
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                            className={classes.close}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }

    private processQueue = () => {
        if (this.queue.length > 0) {
            this.setState({
                open: true
            });
        }
    };

    private handleExited = () => {
        this.processQueue();
    };
}

export default withStyles(styles)(Notification);
