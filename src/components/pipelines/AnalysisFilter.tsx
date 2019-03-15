import { Grid } from "@material-ui/core";
import * as React from "react";
import AnalysisFilterCheckboxGroup from "./AnalysisFilterCheckboxGroup";

export interface IAnalysisFilterProps {
    trialIds: string[];
    experimentalStrategies: string[];
    statuses: string[];
    onTrialIdChange: (trialId: string) => void;
    onExperimentalStrategyChange: (experimentalStrategy: string) => void;
    onStatusChange: (status: string) => void;
}

export default class AnalysisFilter extends React.Component<
    IAnalysisFilterProps,
    {}
> {
    public render() {
        return (
            <div className="Analysis-filter">
                <Grid container={true}>
                    <Grid item={true} xs={12}>
                        <AnalysisFilterCheckboxGroup
                            title="Trial Name"
                            options={this.props.trialIds}
                            onChange={this.props.onTrialIdChange}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <AnalysisFilterCheckboxGroup
                            title="Experimental Strategy"
                            options={this.props.experimentalStrategies}
                            onChange={this.props.onExperimentalStrategyChange}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <AnalysisFilterCheckboxGroup
                            title="Status"
                            options={this.props.statuses}
                            onChange={this.props.onStatusChange}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
