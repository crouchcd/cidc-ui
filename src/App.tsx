import * as React from "react";
import "./App.css";
import BrowseFilesPage from "./components/browseFiles/BrowseFilesPage";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <BrowseFilesPage/>
            </div>
        );
    }
}

export default App;
