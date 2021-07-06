import React, { useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {PhoneDisabled } from "@material-ui/icons";
import VideoPlayer from "./VideoPlayer";
import "../styles.css";
import ChatBox from './ChatBox'
import { SocketContext } from './SocketContext';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',

        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    videotag: {
        margin: "50px 0px 0px 0px",
    },
    chattag: {
        margin: "65px 0px 0px 0px",
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
    },
}));


const Home2 = () => {
    const { callAccepted, callEnded, leaveCall } = useContext(SocketContext);
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}  className={classes.videotag}>
                        <VideoPlayer />
                    </Grid>
                    <Grid item xs={6}  className={classes.chattag}>
                        <ChatBox></ChatBox>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
            <Grid container>
                <Grid item xs={5}>

                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={() => leaveCall()} className={classes.margin}>
                        Hang Up
                    </Button>
                </Grid>
                <Grid item xs={5}>

                </Grid>
                </Grid>
            </Grid>

        </Grid >

    )
}

export default Home2;