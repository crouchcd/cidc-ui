import { Grid, TextField } from '@material-ui/core';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import * as React from 'react';
import { File } from "../../model/File";
import "./BrowseFiles.css";
import { changeOption, filterFiles } from "./BrowseFilesUtil";
import FileFilter from "./FileFilter";
import FileTable from "./FileTable";
import mockFiles from "./mockFiles.json";

export interface IBrowseFilesPageState {
    files: File[];
    selectedTrialIds: string[];
    selectedExperimentalStrategies: string[];
    selectedDataFormats: string[];
    searchFilter: string;
}

export default class BrowseFilesPage extends React.Component<{}, IBrowseFilesPageState> {

    state: IBrowseFilesPageState = {
        files: [],
        searchFilter: "",
        selectedDataFormats: [],
        selectedExperimentalStrategies: [],
        selectedTrialIds: [],
    }

    componentDidMount() {
        this.setState({
            files: mockFiles
        });
    }

    @autobind
    private handleTrialIdChange(trialId: string) {
        this.setState({ selectedTrialIds: changeOption(this.state.selectedTrialIds, trialId) });
    }

    @autobind
    private handleExperimentalStrategyChange(experimentalStrategy: string) {
        this.setState({
            selectedExperimentalStrategies: changeOption(this.state.selectedExperimentalStrategies,
                experimentalStrategy)
        });
    }

    @autobind
    private handleDataFormatChange(dataFormat: string) {
        this.setState({ selectedDataFormats: changeOption(this.state.selectedDataFormats, dataFormat) });
    }

    @autobind
    private handleSearchFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchFilter: event.target.value });
    }

    // tslint:disable-next-line:member-ordering
    public render() {
        return (
            <div className="Browse-files-page">
                <Grid container={true} spacing={32}>
                    <Grid item={true} xs={3}>
                        <FileFilter trialIds={_.uniq(_.map(this.state.files, "trialId"))}
                            experimentalStrategies={_.uniq(_.map(this.state.files, "experimentalStrategy"))}
                            dataFormats={_.uniq(_.map(this.state.files, "dataFormat"))}
                            onTrialIdChange={this.handleTrialIdChange}
                            onExperimentalStrategyChange={this.handleExperimentalStrategyChange}
                            onDataFormatChange={this.handleDataFormatChange} />
                    </Grid>
                    <Grid item={true} xs={9}>
                        <div className="File-search-border">
                            <TextField label="Search by file name" type="search" margin="normal" variant="outlined"
                                value={this.state.searchFilter} className="File-search" InputProps={{
                                    className: "File-search-input",
                                }} InputLabelProps={{
                                    className: "File-search-label"
                                }} onChange={this.handleSearchFilterChange} />
                        </div>
                        <FileTable files={filterFiles(this.state.files, this.state.selectedTrialIds,
                            this.state.selectedExperimentalStrategies, this.state.selectedDataFormats, this.state.searchFilter)} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
