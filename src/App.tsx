import * as React from "react";
import "./App.css";
import { NotificationProvider } from "./components/NotificationContext";
import NotifyButton from "./components/NotifyButton";
import TableDataFrame from "./components/TableDataFrame";
import { UploadStatus } from "./components/UploadStatus";
import { RawOrParse, Severity } from "./interfaces/IValidationError";

const rawOrParse: RawOrParse = "PARSE";
const severity: Severity = "WARNING";
const mockOlink = {
    _etag: "asdfbzcx334",
    _id: "0123",
    _updated: "asdfklasdjf",
    assay: "assay1",
    children: [
        {
            _id: "1234",
            resource: "olink",
            validation_errors: [
                {
                    affected_paths: ["a", "b"],
                    explanation: "Something went wrong",
                    raw_or_parse: rawOrParse,
                    severity
                }
            ]
        },
        {
            _id: "5678",
            resource: "olink",
            validation_errors: [
                {
                    affected_paths: ["c", "d"],
                    explanation: "Another thing went wrong",
                    raw_or_parse: rawOrParse,
                    severity
                }
            ]
        }
    ],
    date_created: "asdfasdf",
    file_name: "test_file_1_OLINK_NPX.xml",
    gs_uri: "gs://bucket/path/to/file",
    mapping: "raw",
    processed: false,
    sample_id: "PD1234",
    trial: "trial1",
    visibility: true
};

const mockOlink2 = {
    _etag: "asdfbzcx33fsd4",
    _id: "0124942",
    _updated: "asfdfdfklasdjf",
    assay: "assay2",
    children: [
        {
            _id: "8910x1234",
            resource: "cnv",
            validation_errors: [
                {
                    affected_paths: ["q"],
                    explanation: "Something went wrong",
                    raw_or_parse: rawOrParse,
                    severity
                }
            ]
        }
    ],
    date_created: "asdfasdf",
    file_name: "some_bam_file",
    gs_uri: "gs://bucket/path/to/file",
    mapping: "raw",
    processed: false,
    sample_id: "PD1234678",
    trial: "trial2",
    visibility: true
};
const mockReturn = {
    _items: [mockOlink, mockOlink2],
    deleteFunction: (fileID: string) => null
};

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
        <div>
            "This is the dev environment"
            <NotificationProvider>
                <UploadStatus
                    {...{
                        _items: mockReturn._items,
                        deleteFunction: mockReturn.deleteFunction
                    }}
                />
                <NotifyButton />
            </NotificationProvider>
        </div>
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
