import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import * as React from "react";

interface IDeleteButtonProps {
    fileID: string;
    deleteRecord(fileID: string): void;
}

const DeleteButton: React.SFC<IDeleteButtonProps> = props => {
    const handleDelete = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        props.deleteRecord(props.fileID);
    };
    return (
        <Button onClick={handleDelete} color="secondary">
            Delete
            <DeleteIcon />
        </Button>
    );
};

export default DeleteButton;
