import * as React from "react";
import { getUploaded, IDataResult, recordDelete } from "../api/api";
import { ICustomWindow } from "../initialize";
import { INotificationContextState } from "./NotificationContext";
import { UploadStatus } from "./UploadStatus";
import withNotificationContext from "./WithNotificationContext";

interface IState {
    data: {
        _items: IDataResult[] | undefined;
    };
}

const customWindow: ICustomWindow = window;

/**
 * Stateful "smart component" that wraps the upload status presentational component.
 */
class TableDataFrame extends React.Component<
    { notificationContext?: INotificationContextState },
    IState
> {
    public state: Readonly<IState> = {
        data: {
            _items: []
        }
    };

    /**
     * Function that will visually banish a record that has been deleted.
     * @param recordID ID of the record to be deleted.
     */
    public handleDelete(id: string) {
        recordDelete(id).then(didDelete => {
            if (didDelete && this.state.data._items) {
                const newState = this.state.data._items.filter(
                    item => item._id !== id
                );
                this.setState({ data: { _items: newState } });
            }
            else if (this.props.notificationContext) {
                this.props.notificationContext.handleClick(
                    "Record delete failed"
                )
            }
        });
    }

    public componentDidMount() {
        const options = {
            endpoint: "data",
            json: true,
            method: "GET",
            token: customWindow.initialData
        };
        getUploaded(options)
            .then(results => {
                this.setState({ data: { _items: results } });
            })
            .catch(error => {
                if (this.props.notificationContext) {
                    this.props.notificationContext.handleClick(
                        "Could not fetch results"
                    );
                }
            });
    }

    public render() {
        return (
            this.props.notificationContext && (
                <div>
                    <UploadStatus
                        {...{
                            _items: this.state.data._items,
                            deleteFunction: this.handleDelete
                        }}
                    />
                </div>
            )
        );
    }
}

export default withNotificationContext(TableDataFrame);
