import * as React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class PipelinesPage extends React.Component<any, {}> {

    public render() {

        if(!this.props.auth.checkAuth(this.props.location.pathname)) {
            return;
        }

        return (
            <div className="Content">
                <Typography variant="h6" gutterBottom={true} style={{fontWeight: "bold"}}>
                    The CIDC currently supports the following pipelines:
                </Typography>
                <Typography style={{fontSize: 18}}>
                    <li><Link to="/wes-pipeline">Whole exome sequencing data.</Link></li>
                </Typography>
            </div>
        );
    }
}
