import React from "react";
import { Grid } from "@material-ui/core";
import "./ChatBox.css";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    fromuser: {
        backgroundColor: "rgba(202, 247, 227, 0.8 )",

    },
    touser: {
        backgroundColor: "rgba(246, 223, 235, 0.5 )",

    }
}));


const Message = (props) => {
    const classes = useStyles();
    return (
        <div>
            {
                !props.fromme ? (
                    <div class="">
                        <Grid container>
                            <Grid item xs={4}>

                            </Grid>
                            <Grid item xs={8} className={classes.fromme}>
                                <div className={classes.fromme} class="message message-me box sb4">
                                    <p class="meta">{props.name} <span>{props.time}</span></p>
                                    <p class="text">
                                        {props.title}
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                ) : (
                    <div class="message">
                        <Grid container>

                            <Grid item xs={8}>
                                <div class="message message-inp box sb3">
                                    <p class="meta">{props.name} <span>{props.time}</span></p>
                                    <p class="text">
                                        {props.title}
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={4}>

                            </Grid>

                        </Grid>
                    </div>
                )
            }
        </div >
    )

};

export default Message;