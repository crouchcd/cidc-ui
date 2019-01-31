import * as React from "react";
import "./App.css";
import BrowseFilesPage from "./components/browseFiles/BrowseFilesPage";
import FileDetailsPage from "./components/browseFiles/FileDetailsPage";
import WholeExomeSequencingPipelineMarkdown from "./components/pipelines/WholeExomeSequencingPipelineMarkdown";
import WholeExomeSequencingUploadMarkdown from "./components/transferData/WholeExomeSequencingUploadMarkdown";
import { Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./components/home/HomePage";
import TransferDataPage from "./components/transferData/TransferDataPage";
import CliInstructions from "./components/transferData/CliInstructions";
import PipelinesPage from "./components/pipelines/PipelinesPage";
import PrivacyAndSecurityPage from "./components/privacyAndSecurity/PrivacyAndSecurityPage";
import UserAccountPage from "./components/userAccount/UserAccountPage";
import Unauthorized from "./auth/Unauthorized";
import Auth from './auth/Auth';
import history from './auth/History';
import autobind from "autobind-decorator";

class App extends React.Component<any, any> {

    state = {
        email: '',
        token: ''
    }

    private auth = new Auth(this.handleEmailUpdate, this.handleTokenUpdate);

    @autobind
    handleAuthentication(props: any) {
        if (/access_token|id_token|error/.test(props.location.hash)) {
            this.auth.handleAuthentication();
        }
    }

    @autobind
    handleEmailUpdate(email: string) {
        this.setState({ email });
    }

    @autobind
    handleTokenUpdate(token: string) {
        this.setState({ token });
    }

    public render() {

        return (
            <Router history={history}>
                <div className="App">
                    <Header auth={this.auth} email={this.state.email} />
                    <Switch>
                        <Route path='/' exact={true}
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <HomePage auth={this.auth} {...props} />} />
                        <Route path='/transfer-data'
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <TransferDataPage auth={this.auth} {...props} />} />
                        <Route path='/browse-files'
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <BrowseFilesPage auth={this.auth} token={this.state.token} {...props} />} />
                        <Route path='/pipelines'
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <PipelinesPage auth={this.auth} {...props} />} />
                        <Route path='/cli-instructions'
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <CliInstructions auth={this.auth} {...props} />} />
                        <Route path='/wes-pipeline'
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <WholeExomeSequencingPipelineMarkdown auth={this.auth} {...props} />} />
                        <Route path='/wes-upload'
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <WholeExomeSequencingUploadMarkdown auth={this.auth} {...props} />} />
                        <Route path='/privacy-security'
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <PrivacyAndSecurityPage auth={this.auth} {...props} />} />
                        <Route path='/user-account'
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <UserAccountPage auth={this.auth} token={this.state.token} {...props} />} />
                        <Route path='/file-details/:fileId'
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <FileDetailsPage auth={this.auth} token={this.state.token} {...props} />} />
                        <Route path='/unauthorized'
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => <Unauthorized auth={this.auth} {...props} />} />
                        <Route path="/callback"
                            // tslint:disable-next-line:jsx-no-lambda
                            render={(props) => {
                                this.handleAuthentication(props);
                                return null;
                            }} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
