import React from "react";
import sortBy from "lodash/sortBy";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Grid,
    Typography,
    Card,
    CardContent,
    withStyles,
    Chip
} from "@material-ui/core";
import { withIdToken } from "../identity/AuthProvider";
import { ITrialOverview } from "../../model/trial";
import useSWR from "swr";
import Loader from "../generic/Loader";
import { RouteComponentProps } from "react-router";
import { useRootStyles } from "../../rootStyles";
import { formatFileSize } from "../../util/utils";
import { IDataOverview } from "../../api/api";

const HeaderCell = withStyles({
    root: {
        textTransform: "uppercase",
        fontWeight: "bold"
    }
})(TableCell);

const nonAssayFields = [
    "trial_id",
    "file_size_bytes",
    "clinical_participants",
    "total_participants",
    "total_samples"
];

const DataOverviewTable: React.FC = withIdToken(({ token }) => {
    const { data: overview } = useSWR<IDataOverview>(["/info/data_overview"]);
    const { data: summary } = useSWR<ITrialOverview[]>([
        "/trial_metadata/summaries",
        token
    ]);

    if (summary === undefined || overview === undefined) {
        return (
            <Grid container justify="center">
                <Grid item>
                    <Loader />
                </Grid>
            </Grid>
        );
    }

    if (summary.length === 0) {
        return <Typography>No data found.</Typography>;
    }

    const assays = Object.keys(summary[0]).filter(
        k => !nonAssayFields.includes(k)
    );

    // List trials with clinical data first, ordered by total file size
    const sortedData = sortBy(summary, s => [
        s.clinical_participants > 0,
        s.file_size_bytes
    ]).reverse();

    return (
        <Card>
            <CardContent>
                <Chip
                    variant="outlined"
                    label={
                        <>
                            <Typography
                                display="inline"
                                style={{ fontWeight: "bold" }}
                            >
                                Total Data Ingested:{" "}
                            </Typography>
                            <Typography display="inline">
                                {formatFileSize(overview.num_bytes)}
                            </Typography>
                        </>
                    }
                />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{ borderBottom: 0 }}
                                colSpan={3}
                            />
                            <TableCell colSpan={assays.length} align="center">
                                # of Samples per Assay
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <HeaderCell>Protocol ID</HeaderCell>
                            <HeaderCell>Data Size</HeaderCell>
                            <HeaderCell align="center">
                                Clinical Data
                            </HeaderCell>
                            {assays.map(assay => (
                                <HeaderCell key={assay}>{assay}</HeaderCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map(row => (
                            <TableRow key={row.trial_id}>
                                <TableCell>{row.trial_id}</TableCell>
                                <TableCell align="right">
                                    {formatFileSize(row.file_size_bytes)}
                                </TableCell>
                                <TableCell align="right">
                                    <Chip
                                        style={{ width: "100%" }}
                                        color={
                                            row.clinical_participants > 0
                                                ? "primary"
                                                : "default"
                                        }
                                        variant="outlined"
                                        label={`${row.clinical_participants} / ${row.total_participants} participants`}
                                    />
                                </TableCell>
                                {assays.map(assay => (
                                    <TableCell key={assay} align="right">
                                        {row[assay] || "-"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
});

const DataOverviewPage: React.FC<RouteComponentProps> = props => {
    const classes = useRootStyles();

    return (
        <Grid
            container
            className={classes.centeredPage}
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <DataOverviewTable />
            </Grid>
        </Grid>
    );
};

export default DataOverviewPage;
