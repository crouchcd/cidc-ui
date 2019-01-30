import * as React from 'react';
import { Typography } from '@material-ui/core';

export default class Unauthorized extends React.Component<any, {}> {

    public render() {

        return (
            <div className="Content">
                <Typography variant="h6" gutterBottom={true} style={{fontWeight: "bold"}}>You are unauthorized</Typography>
            </div>
        );
    }
}
