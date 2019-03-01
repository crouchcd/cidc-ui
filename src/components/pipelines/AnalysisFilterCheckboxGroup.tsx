import {
    FormControlLabel,
    FormGroup,
    Toolbar,
    Typography
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import autobind from "autobind-decorator";
import * as React from "react";

export interface IAnalysisFilterCheckboxGroupProps {
    title: string;
    options: string[];
    onChange: (option: string) => void;
}

export default class AnalysisFilterCheckboxGroup extends React.Component<
    IAnalysisFilterCheckboxGroupProps,
    {}
> {
    @autobind
    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(event.target.value);
    }

    public render() {
        return (
            <div>
                <Toolbar className="Analysis-filter-toolbar">
                    <Typography className="Analysis-filter-toolbar-text">
                        {this.props.title}
                    </Typography>
                </Toolbar>
                <div className="Analysis-filter-checkboxes">
                    <FormGroup>
                        {this.props.options.map((dataFormat: string) => {
                            return (
                                <FormControlLabel
                                    key={dataFormat}
                                    label={dataFormat}
                                    control={
                                        <Checkbox
                                            value={dataFormat}
                                            onChange={this.handleChange}
                                            className="Analysis-filter-checkbox"
                                        />
                                    }
                                />
                            );
                        })}
                    </FormGroup>
                </div>
            </div>
        );
    }
}
