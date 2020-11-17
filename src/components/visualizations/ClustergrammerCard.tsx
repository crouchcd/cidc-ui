import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Link,
    Typography
} from "@material-ui/core";
import { OpenInNew } from "@material-ui/icons";
import React from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { DataFile } from "../../model/file";
import { widths } from "../../rootStyles";
import useRawFile from "../../util/useRawFile";
import ContactAnAdmin from "../generic/ContactAnAdmin";

// TODO: refine this type
export interface INetworkData {
    [k: string]: any;
}

export interface IClustergrammerProps {
    networkData: INetworkData;
    width?: number;
    height?: number;
}

/** Wrapper for clustergrammer-js: https://clustergrammer.readthedocs.io/clustergrammer_js.html
 *
 * NOTE: this component renders static files stored in the `public/static/cg/` directory.
 */
export const Clustergrammer: React.FC<IClustergrammerProps> = props => {
    const cgHTML = useRawFile("/static/cg/clustergrammer.html");

    const drawCg = (iframe: {
        document: Document & { DrawClustergram?: (cfg: any) => void };
    }) => {
        setTimeout(() => {
            if (iframe.document.DrawClustergram) {
                iframe.document.DrawClustergram({
                    network_data: props.networkData,
                    sidebar_width: 125
                });
            }
        }, 1000);
    };

    return cgHTML ? (
        <Frame
            title="clustergrammer-iframe"
            initialContent={cgHTML}
            width={props.width || 1000}
            height={props.height || 600}
            frameBorder={0}
        >
            <FrameContextConsumer>
                {(context: any) => drawCg(context)}
            </FrameContextConsumer>
        </Frame>
    ) : null;
};

const CLUSTERGRAMMER_HELP_LINK =
    "https://clustergrammer.readthedocs.io/interacting_with_viz.html";

export interface IClustergrammerCardProps {
    file: DataFile;
}

const ClustergrammerCard: React.FC<IClustergrammerCardProps> = ({ file }) => {
    const width = widths.minPageWidth;
    const height = 800;

    return (
        <Card>
            <CardHeader
                title={
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>Visualize with Clustergrammer</Grid>{" "}
                        <Grid item>
                            <Button
                                href={CLUSTERGRAMMER_HELP_LINK}
                                variant="outlined"
                                target="_blank"
                                endIcon={<OpenInNew />}
                            >
                                Clustergrammer Docs
                            </Button>
                        </Grid>
                    </Grid>
                }
            />
            <CardContent style={{ overflowX: "scroll" }}>
                <Box m="auto" width={width}>
                    {file.clustergrammer ? (
                        <>
                            <Typography
                                variant="subtitle1"
                                paragraph
                                gutterBottom
                            >
                                <strong>Note:</strong> the rows in this
                                visualization have been z-score normalized using
                                Clustergrammer's built-in{" "}
                                <Link
                                    href="https://clustergrammer.readthedocs.io/clustergrammer_py.html#clustergrammer_py.Network.normalize"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <code>normalize</code>
                                </Link>{" "}
                                function.
                            </Typography>
                            <Clustergrammer
                                networkData={file.clustergrammer}
                                width={width}
                                height={height}
                            />
                        </>
                    ) : (
                        <Typography color="textSecondary">
                            Oops! This file cannot be visualized with
                            Clustergrammer. Please <ContactAnAdmin lower /> so
                            we can investigate this issue.
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ClustergrammerCard;
