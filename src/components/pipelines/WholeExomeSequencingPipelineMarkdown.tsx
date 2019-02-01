import * as React from 'react';
import ReactMarkdown from "react-markdown";
import 'github-markdown-css/github-markdown.css';
import {MARKDOWN_FOLDER_PATH} from "../../util/Constants";

export interface IWholeExomeSequencingPipelineMarkdownState {
    markdown: string;
}

const MARKDOWN_FILE_NAME: string = "cidc-documentation/master/assays/wes.md";

export default class WholeExomeSequencingPipelineMarkdown extends React.Component<any, IWholeExomeSequencingPipelineMarkdownState> {

    state: IWholeExomeSequencingPipelineMarkdownState = {
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
