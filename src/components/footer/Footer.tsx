import * as React from "react";
import "./Footer.css";

export default class Footer extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="Footer">
                CIDC @ Dana-Farber Cancer Institute {new Date().getFullYear()}{" "}
                &copy;
            </div>
        );
    }
}
