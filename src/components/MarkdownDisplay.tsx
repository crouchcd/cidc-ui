import * as React from "react";
import * as ReactMarkdown from "react-markdown";

interface IMarkdownDisplayProps {
    markdownText: string;
}

const MarkdownDisplay = (props: IMarkdownDisplayProps) => (
    <div>
        <ReactMarkdown source={props.markdownText}/>
    </div>
    
)

export default MarkdownDisplay