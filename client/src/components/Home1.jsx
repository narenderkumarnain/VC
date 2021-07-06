import React, { useContext } from 'react';
import { Typography, AppBar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from "./VideoPlayer";
import SideBar from "./SideBar";
import Notifications from "./Notifications";
import "../styles.css";
import { SocketContext } from './SocketContext';


const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 5,
        margin: '65px 0px',
        backgroundColor: "rgba(246, 223, 235, 0.4)",
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    video: {
        margin: "15px 0px",
    },
    margin: {
        marginTop: 20,
        width: '200px',
        align: 'center',
        contentAlign: 'center',
    },
    image: {
        marginLeft: '15px',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: "75px 0px"
    },
    sidebar: {
        margin: "120px 0px",
    }
}));


const Home1 = () => {
    const { callAccepted, callEnded, leaveCall } = useContext(SocketContext);
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Grid container>
                <Grid item xs={6} className={classes.video}>
                    <VideoPlayer />
                </Grid>
                <Grid item xs={6}  >
                    <AppBar className={classes.appBar} position="relative" color="inherit">
                        <Typography variant="h4" align="center">Welcome to Video Chat!</Typography>
                    </AppBar>
                    <Grid item xs={12} className={classes.sidebar}>
                        <SideBar>
                            <Notifications />
                        </SideBar>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}

export default Home1;