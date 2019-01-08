import * as React from "react";
import ReactMarkdown from "react-markdown";

interface IMarkdownDisplayProps {
    markdownText: string;
}

const MarkdownDisplay = (props: IMarkdownDisplayProps) => (
    <div>
        <ReactMarkdown source={props.markdownText}/>
    </div>
    
)

export default MarkdownDisplay