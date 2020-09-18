import * as React from "react";
import {
    Typography,
    Chip,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Link
} from "@material-ui/core";
import UserManager from "./UserManager";
import { ORGANIZATION_NAME_MAP } from "../../util/constants";
import ContactAnAdmin from "../generic/ContactAnAdmin";
import { AuthContext } from "../identity/AuthProvider";
import { useUserContext } from "../identity/UserProvider";
import { AccountCircle, FolderShared } from "@material-ui/icons";
import Loader from "../generic/Loader";
import { useRootStyles } from "../../rootStyles";
import TrialManager from "./TrialManager";

export default function UserAccountPage() {
    const classes = useRootStyles();

    const authData = React.useContext(AuthContext);
    const userAccount = useUserContext();

    const isAdmin = userAccount && userAccount.role === "cidc-admin";
    const isNCI = userAccount && userAccount.role === "nci-biobank-user";
    const permissions = userAccount && userAccount.permissions;
    const hasPerms = permissions && permissions.length > 0;

    return (
        <div className={classes.centeredPage}>
            {!userAccount || !permissions ? (
                <Loader />
            ) : (
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <Grid container spacing={3}>
                            <Grid item>
                                <Card style={{ height: "100%" }}>
                                    <CardHeader
                                        avatar={<AccountCircle />}
                                        title={
                                            <Grid
                                                container
                                                justify="space-between"
                                                alignItems="center"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    color="textSecondary"
                                                >
                                                    Personal Info
                                                </Typography>
                                                <Link href="/logout">
                                                    Logout
                                                </Link>
                                            </Grid>
                                        }
                                    />
                                    <CardContent>
                                        <Grid
                                            container
                                            justify="flex-start"
                                            direction="column"
                                        >
                                            <Grid item>
                                                <Typography paragraph>
                                                    {`${userAccount.first_n} ${userAccount.last_n}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography paragraph>
                                                    {userAccount.email}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography paragraph>
                                                    {
                                                        ORGANIZATION_NAME_MAP[
                                                            userAccount
                                                                .organization
                                                        ]
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography paragraph>
                                                    Joined on{" "}
                                                    {new Date(
                                                        userAccount._created
                                                    ).toLocaleDateString()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card style={{ height: "100%" }}>
                                    <CardHeader
                                        avatar={<FolderShared />}
                                        title={
                                            <Typography
                                                variant="h6"
                                                color="textSecondary"
                                            >
                                                Dataset Access
                                            </Typography>
                                        }
                                    />
                                    <CardContent>
                                        <div>
                                            <Grid container spacing={2}>
                                                {isAdmin || isNCI ? (
                                                    <Grid item>
                                                        <Typography paragraph>
                                                            Your role (
                                                            <code>
                                                                {
                                                                    userAccount.role
                                                                }
                                                            </code>
                                                            ) gives you access
                                                            to all datasets.
                                                        </Typography>
                                                    </Grid>
                                                ) : hasPerms ? (
                                                    permissions.map(perm => {
                                                        return (
                                                            <Grid
                                                                item
                                                                key={
                                                                    perm.trial_id +
                                                                    perm.upload_type
                                                                }
                                                            >
                                                                <Chip
                                                                    label={`${perm.trial_id}: ${perm.upload_type}`}
                                                                />
                                                            </Grid>
                                                        );
                                                    })
                                                ) : (
                                                    <Grid item>
                                                        <Typography
                                                            variant="h5"
                                                            color="textSecondary"
                                                            paragraph
                                                        >
                                                            You do not have
                                                            access to any
                                                            datasets.
                                                            <br />
                                                            <ContactAnAdmin />{" "}
                                                            if you believe this
                                                            is a mistake.
                                                        </Typography>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    {userAccount &&
                        authData &&
                        userAccount.role === "cidc-admin" && (
                            <>
                                <Grid item>
                                    <TrialManager token={authData.idToken} />
                                </Grid>
                                <Grid item>
                                    <UserManager
                                        token={authData.idToken}
                                        userId={userAccount.id}
                                    />
                                </Grid>
                            </>
                        )}
                </Grid>
            )}
        </div>
    );
}