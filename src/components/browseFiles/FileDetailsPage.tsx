import * as React from 'react';

export default class FileDetailsPage extends React.Component<any, {}> {

    public render() {

        if(!this.props.auth.checkAuth(this.props.location.pathname)) {
            return null;
        }

        return (
            <div className="Browse-files-page">
                {this.props.match.params.fileId}
            </div>
        );
    }
}
