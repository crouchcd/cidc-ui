import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import { IDataChild, IDataResult } from "../api/api";
import DeleteButton from "./DeleteButton";

interface IUploadStatusProps {
    _items: IDataResult[] | undefined;
    deleteFunction(fileID: string): void;
}

const renderChildren = (childArray: IDataChild[]) => {
    const renderArray = childArray.map(child => {
        return <p key={child._id}>{child.resource}</p>;
    });
    return renderArray;
};

const UploadStatus: React.SFC<IUploadStatusProps> = props => {
    if (props._items) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell>File ID</TableCell>
                        <TableCell>Children</TableCell>
                        <TableCell>Validation Errors</TableCell>
                        <TableCell>Delete File</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props._items.map(row => {
                        return (
                            <TableRow key={row._id}>
                                <TableCell>{row.file_name}</TableCell>
                                <TableCell>{row._id}</TableCell>
                                <TableCell>
                                    {row.children
                                        ? renderChildren(row.children)
                                        : ""}
                                </TableCell>
                                <TableCell>
                                    {row.children
                                        ? JSON.stringify(
                                              row.children.map(
                                                  child =>
                                                      child.validation_errors
                                              )
                                          )
                                        : ""}
                                </TableCell>
                                <TableCell>
                                    <DeleteButton
                                        {...{
                                            deleteRecord: props.deleteFunction,
                                            fileID: row._id
                                        }}
                                    >
                                        Delete
                                    </DeleteButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    } else {
        return <div>...Loading (or not Found)</div>;
    }
};

export { UploadStatus, IUploadStatusProps };
