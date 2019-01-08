import * as React from "react";
import { Route } from "react-router";
import { HashRouter, NavLink } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import { NotificationProvider } from "./components/NotificationContext";
import NotifyButton from "./components/NotifyButton";
import SampleMDPage from "./components/pages/SampleMDPage";
import TableDataFrame from "./components/TableDataFrame";
import { mockHomepage, mockUploadStatus } from "./tests/testConstants";

const appJSX = () => {
    return (
        <NotificationProvider>
            <div className="App">
                <TableDataFrame />
            </div>
        </NotificationProvider>
    );
};

const devJSX = () => {
    return (
        <HashRouter>
            <div>
                "This is the dev environment"
                <Navigation />
                <NotificationProvider>
                    <ul className="header">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/upload_status">Upload Status</NavLink>
                        </li>
                        <li>
                            <NavLink to="/markdown">Markdown</NavLink>
                        </li>
                        <div className="content">
                            <Route
                                exact={true}
                                path="/"
                                component={mockHomepage}
                            />
                            <Route
                                path="/upload_status"
                                component={mockUploadStatus}
                            />
                            <Route path="/markdown" component={SampleMDPage} />
                        </div>
                        <NotifyButton />
                    </ul>
                </NotificationProvider>
            </div>
        </HashRouter>
    );
};

class App extends React.Component {
    public render() {
        return (
            <div>
                {process.env.REACT_APP_NODE_ENV === "dev" ? devJSX() : appJSX()}
            </div>
        );
    }
}

export default App;
