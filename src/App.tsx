import * as React from "react";
import "./App.css";
import BrowseFilesPage from "./components/browseFiles/BrowseFilesPage";
import WholeExomeSequencingPipelineMarkdown from "./components/pipelines/WholeExomeSequencingPipelineMarkdown";
import WholeExomeSequencingUploadMarkdown from "./components/instructions/WholeExomeSequencingUploadMarkdown";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path='/browse-files'
                        exact={true}
                        component={BrowseFilesPage} />
                    <Route path='/wes-pipeline'
                        exact={true}
                        component={WholeExomeSequencingPipelineMarkdown} />
                    <Route path='/wes-upload'
                        exact={true}
                        component={WholeExomeSequencingUploadMarkdown} />
                </Switch>
            </Router>
        );
    }
}

export default App;
