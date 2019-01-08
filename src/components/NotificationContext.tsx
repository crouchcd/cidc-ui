import * as React from "react";
import Notification from "./Notification";

interface IMessage {
    message: string;
    key: number;
}

interface INotificationState {
    open: boolean;
    messageInfo: IMessage;
    timeOut: number;
}

const DEFAULT_STATE = {
    handleClick: (message: string) => {
        // notempty
    },
    handleClose: (event: React.SyntheticEvent<HTMLElement>) => {
        // not empty
    },
    handleExited: () => {
        // not empty
    },
    messageInfo: { message: "", key: 1 },
    open: false,
    timeOut: 2000
};

export interface INotificationContextState extends INotificationState {
    handleClick(message: string): void;
    handleClose(event: React.SyntheticEvent<HTMLElement>): void;
    handleExited(): void;
}

const NotificationContext = React.createContext<INotificationContextState | null>(
    null
);

class NotificationProvider extends React.Component {
    public state: Readonly<INotificationState> = DEFAULT_STATE;
    private queue: IMessage[] = [];

    constructor(props: INotificationContextState) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    public handleClick = (message: string) => {
        // tslint:disable-next-line:no-console
        console.log("Message pushed: ", message)
        this.queue.push({
            key: new Date().getTime(),
            message
        });
        if (this.state.open) {
            this.setState({ open: false });
        } else {
            this.processQueue();
        }
    };

    public handleClose = (
        event: React.SyntheticEvent<HTMLElement>
    ) => {
        this.setState({ open: false });
    };

    public render = () => {
        return (
            <NotificationContext.Provider
                value={{
                    handleClick: this.handleClick,
                    handleClose: this.handleClose,
                    handleExited: this.handleExited,
                    messageInfo: this.state.messageInfo,
                    open: this.state.open,
                    timeOut: this.state.timeOut,
                }}
            >
                <Notification />
                {this.props.children}
            </NotificationContext.Provider>
        );
    };
    public processQueue = () => {
        if (this.queue.length > 0 && this.queue[0].message !== "") {
            this.setState({
                messageInfo: this.queue.shift(),
                open: true
            });
        }
    };

    public handleExited = () => {
        this.processQueue();
    };
}

export const NotificationConsumer = NotificationContext.Consumer;
export { NotificationProvider, NotificationContext };
