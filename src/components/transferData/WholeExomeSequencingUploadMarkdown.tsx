import * as React from 'react';
import ReactMarkdown from "react-markdown";
import 'github-markdown-css/github-markdown.css';
import {MARKDOWN_FOLDER_PATH} from "../../util/Constants";

export interface IWholeExomeSequencingUploadMarkdownState {
    markdown: string;
}

const MARKDOWN_FILE_NAME: string = "cidc-documentation/master/assays/wes-upload-doc.md";

export default class WholeExomeSequencingUploadMarkdown extends React.Component<any, IWholeExomeSequencingUploadMarkdownState> {

    state: IWholeExomeSequencingUploadMarkdownState = {
        markdown: ""
    }

    componentWillMount() {
        fetch(MARKDOWN_FOLDER_PATH + MARKDOWN_FILE_NAME)
        .then((response) => response.text()).then((text) => {
            this.setState({ markdown: text })
        });
    }

    public render() {

        if(!this.props.auth.checkAuth(this.props.location.pathname)) {
            return null;
        }

        return (
            <div>
                <ReactMarkdown source={this.state.markdown} className="markdown-body Markdown-width" />
            </div>
        );
    }
}
