import {
    Grid,
    TextField,
    CircularProgress,
    Typography
} from "@material-ui/core";
import autobind from "autobind-decorator";
import _ from "lodash";
import * as React from "react";
import "./BrowseAnalyses.css";
import { changeOption, filterAnalyses } from "./BrowseAnalysesUtil";
import { getAnalyses } from "../../api/api";
import { Analysis } from "../../model/analysis";
import AnalysisTable from "./AnalysisTable";
import AnalysisFilter from "./AnalysisFilter";

export interface IBrowseAnalysesPageState {
    analyses: Analysis[] | undefined;
    error: string | undefined;
    selectedTrialIds: string[];
    selectedExperimentalStrategies: string[];
    searchFilter: string;
}

export default class BrowseAnalysesPage extends React.Component<
    any,
    IBrowseAnalysesPageState
> {
    state: IBrowseAnalysesPageState = {
        analyses: undefined,
        error: undefined,
        selectedTrialIds: [],
        selectedExperimentalStrategies: [],
        searchFilter: ""
    };

    componentDidMount() {
        if (this.props.token) {
            this.getAnalyses();
        }
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.token !== prevProps.token) {
            this.getAnalyses();
        }
    }

    @autobind
    private getAnalyses() {
        getAnalyses(this.props.token)
            .then(results => {
                this.setState({ analyses: results });
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
    }

    @autobind
    private handleTrialIdChange(trialId: string) {
        this.setState({
            selectedTrialIds: changeOption(this.state.selectedTrialIds, trialId)
        });
    }

    @autobind
    private handleExperimentalStrategyChange(experimentalStrategy: string) {
        this.setState({
            selectedExperimentalStrategies: changeOption(
                this.state.selectedExperimentalStrategies,
                experimentalStrategy
            )
        });
    }

    @autobind
    private handleSearchFilterChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        this.setState({ searchFilter: event.target.value });
    }

    public render() {
        if (!this.props.auth.checkAuth(this.props.location.pathname)) {
            return null;
        }

        return (
            <div className="Browse-analyses-page">
                {this.state.error && (
                    <div className="Browse-analyses-progress">
                        <Typography style={{ fontSize: 18 }}>
                            {this.state.error}
                        </Typography>
                    </div>
                )}
                {!this.state.error && !this.state.analyses && (
                    <div className="Browse-analyses-progress">
                        <CircularProgress />
                    </div>
                )}
                {!this.state.error &&
                    this.state.analyses &&
                    this.state.analyses.length === 0 && (
                        <div className="Browse-analyses-progress">
                            <Typography style={{ fontSize: 18 }}>
                                No analyses found
                            </Typography>
                        </div>
                    )}
                {!this.state.error &&
                    this.state.analyses &&
                    this.state.analyses.length > 0 && (
                        <Grid container={true} spacing={32}>
                            <Grid item={true} xs={2}>
                                <AnalysisFilter
                                    trialIds={_.uniq(
                                        _.map(this.state.analyses, "trial_name")
                                    )}
                                    experimentalStrategies={_.uniq(
                                        _.map(
                                            this.state.analyses,
                                            "experimental_strategy"
                                        )
                                    )}
                                    onTrialIdChange={this.handleTrialIdChange}
                                    onExperimentalStrategyChange={
                                        this.handleExperimentalStrategyChange
                                    }
                                />
                            </Grid>
                            <Grid item={true} xs={10}>
                                <div className="Analysis-search-border">
                                    <TextField
                                        label="Search by pipeline ID"
                                        type="search"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.searchFilter}
                                        className="Analysis-search"
                                        InputProps={{
                                            className: "Analysis-search-input"
                                        }}
                                        InputLabelProps={{
                                            className: "Analysis-search-label"
                                        }}
                                        onChange={this.handleSearchFilterChange}
                                    />
                                </div>
                                <AnalysisTable
                                    history={this.props.history}
                                    analyses={filterAnalyses(
                                        this.state.analyses,
                                        this.state.selectedTrialIds,
                                        this.state
                                            .selectedExperimentalStrategies,
                                        this.state.searchFilter
                                    )}
                                />
                            </Grid>
                        </Grid>
                    )}
            </div>
        );
    }
}
