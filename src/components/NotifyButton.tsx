import { Button } from "@material-ui/core";
import * as React from "react";
import { NotificationConsumer } from "./NotificationContext";

const NotifyButton = () => (
    <NotificationConsumer>
        {value =>
            value && (
                <Button
                    variant="contained"
                    color="primary"
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={() =>
                        value.handleClick("Notification message here.")
                    }
                >
                    Click.
                </Button>
            )
        }
    </NotificationConsumer>
);

export default NotifyButton;
