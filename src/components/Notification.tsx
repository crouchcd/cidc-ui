import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { NotificationConsumer } from "./NotificationContext";

const styles = (theme: Theme) =>
    createStyles({
        close: {
            padding: theme.spacing.unit / 2
        }
    });

    interface IMessage {
        message: string;
        key: number;
    }

    interface INotificationState {
        open: boolean;
        messageInfo: IMessage;
        timeOut: number;
    }

    interface INotificationContextState extends INotificationState{
        handleClick(message: string): null;
        handleClose(event: React.MouseEvent<HTMLElement>): null;
        handleExited(): void;
    }

class SnackContext extends React.Component<
    WithStyles<typeof styles>
> {
    public render() {
        const { classes } = this.props;
        return (
            <div>
                <NotificationConsumer>
                    {(value: INotificationContextState|null) => value && (
                <Snackbar
                    key={value.messageInfo.key}
                    anchorOrigin={{
                        horizontal: "left",
                        vertical: "bottom"
                    }}
                    open={value.open}
                    autoHideDuration={3000}
                    onClose={value.handleClose}
                    onExited={value.handleExited}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id">{value.messageInfo.message}</span>}
                    action={[
                        <Button
                            key="undo"
                            color="secondary"
                            size="small"
                            onClick={value.handleClose}
                        >
                            CLOSE
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={value.handleClose}
                            className={classes.close}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
                    )}
                </NotificationConsumer>
            </div>
        );
    }
}

export default withStyles(styles)(SnackContext);
