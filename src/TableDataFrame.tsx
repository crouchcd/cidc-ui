import * as React from "react";
import { getFormatted } from "./api";
import { ITableProps, StatusTable } from "./StatusTable";

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
  uri: "https://lmportal.cimac-network.org:443/api/olink"
};

interface IState {
  olinkData: ITableProps;
}

export default class TableDataFrame extends React.Component<object, IState> {
  public state: Readonly<IState> = {
    olinkData: {
      _items: []
    }
  };

  public componentDidMount() {
    getFormatted(options)
      .then(res => {
        this.setState({ olinkData: { _items: res } });
      })
      // tslint:disable-next-line:no-console
      .catch(e => console.log(e));
  }

  public render() {
    return <StatusTable {...this.state.olinkData} />;
  }
}
