import * as React from "react";
import MarkdownDisplay from "../MarkdownDisplay";

const some = {
    markdownText: `

### Heading

* Bullet
* point
* list

**bold**

*italic*`
};

const SampleMDPage = () => {
    return (
        <div>
            <MarkdownDisplay {...some} />
        </div>
    );
};

export default SampleMDPage;
