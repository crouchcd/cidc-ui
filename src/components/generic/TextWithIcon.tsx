import React from "react";
import {
    Typography,
    Grid,
    TypographyProps,
    GridProps
} from "@material-ui/core";

export interface ITextWithIconProps extends TypographyProps {
    icon: React.ReactElement;
    spacing?: GridProps["spacing"];
    placement?: "before" | "after";
}

const TextWithIcon: React.FC<ITextWithIconProps> = ({
    icon,
    spacing = 1,
    placement = "before",
    children,
    ...typographyProps
}) => {
    const iconItem = <Grid item>{icon}</Grid>;

    return (
        <Grid
            container
            spacing={spacing}
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
        >
            {placement === "before" && iconItem}
            <Grid item>
                <Typography {...typographyProps}>{children}</Typography>
            </Grid>
            {placement === "after" && iconItem}
        </Grid>
    );
};

export default TextWithIcon;
