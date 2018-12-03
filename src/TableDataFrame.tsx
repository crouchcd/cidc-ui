import * as React from "react";
import { getFormatted } from "./api";
import {recordDelete} from "./api/utilities";
import currentUrl from "./initialize";
import { ITableData, StatusTable } from "./StatusTable";

interface ICustomWindow extends Window {
    initialData?: string;
}

const customWindow: ICustomWindow = window;

const options = {
    headers: {
        Authorization: `Bearer ${customWindow.initialData}`
    },
    json: true,
    method: "GET",
    uri: `${currentUrl}/api/olink`
};

interface IState {
    olinkData: {
        _items: ITableData[] | undefined;
    };
}

export default class TableDataFrame extends React.Component<object, IState> {
    public state: Readonly<IState> = {
        olinkData: {
            _items: []
        }
    };

    /**
     * Function that will visually banish a record that has been deleted.
     * @param recordID ID of the record to be deleted.
     */
    public handleDelete(recordID: string) {
        recordDelete(recordID).then(didDelete => {
            if (didDelete && this.state.olinkData._items) {
                const newState = this.state.olinkData._items.filter(
                    item => item.record_id !== recordID
                );
                this.setState({ olinkData: { _items: newState } });
            }
        });
    }

    public componentDidMount() {
        getFormatted(options)
            .then(res => {
                this.setState({ olinkData: { _items: res } });
            })
            // tslint:disable-next-line:no-console
            .catch(e => console.log(e));
    }

    public render() {
      // tslint:disable-next-line:no-console
      console.log(this.state.olinkData)
        return (
            <StatusTable
                {...{
                    _items: this.state.olinkData._items,
                    deleteFunction: this.handleDelete
                }}
            />
        );
    }
}
