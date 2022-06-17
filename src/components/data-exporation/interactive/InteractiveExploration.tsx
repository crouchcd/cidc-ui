import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography
} from "@material-ui/core";
import { useRootStyles } from "../../../rootStyles";

const InteractiveExplorationPage: React.FC<{
    viewToggleButton: React.ReactElement;
}> = props => {
    const classes = useRootStyles();

    return (
        <Grid
            container
            direction="column"
            spacing={1}
            className={classes.centeredPage}
            alignItems="center"
        >
            <Grid
                item
                style={{
                    maxWidth: 1100,
                    width: "inherit"
                }}
            >
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item>
                        <Box margin={1}>
                            <Typography color="textSecondary" variant="caption">
                                Interactive view based on filtering with
                                on-screen controls
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>{props.viewToggleButton}</Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Card style={{ maxWidth: 1100, width: "inherit" }}>
                    <CardHeader title="Overview" />
                    <CardContent className="markdown-body">
                        <Typography>
                            In this Data Exploration View, the CIDC provides a
                            number of interactive dashboards for exploring
                            participant- and sample-level metadata for all
                            trials.
                        </Typography>

                        <iframe
                            title="embedded-datastudio"
                            height="475"
                            width="100%"
                            src="https://datastudio.google.com/embed/reporting/6865f6eb-f7f8-4f7f-87b2-f591403dd813/page/p_7gryw0ykuc"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card style={{ maxWidth: 1100, width: 1100 }}>
                    <CardHeader title="Direct Links" />
                    <CardContent className="markdown-body">
                        <Typography>
                            <ul>
                                {[
                                    {
                                        name:
                                            "Participants Based on Sample Collection Events",
                                        destination:
                                            "https://datastudio.google.com/reporting/6865f6eb-f7f8-4f7f-87b2-f591403dd813/page/RQ4qC"
                                    },
                                    {
                                        name:
                                            "Participants Based on Assays Run",
                                        destination:
                                            "https://datastudio.google.com/reporting/6865f6eb-f7f8-4f7f-87b2-f591403dd813/page/p_4edtmds7tc"
                                    },
                                    {
                                        name: "Sample Dashboard",
                                        destination:
                                            "https://datastudio.google.com/reporting/6865f6eb-f7f8-4f7f-87b2-f591403dd813/page/p_4sllxheeuc"
                                    }
                                ].map(item => (
                                    <li>
                                        <a href={item.destination}>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default InteractiveExplorationPage;
