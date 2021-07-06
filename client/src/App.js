import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./styles.css";
import { SocketContext } from './components/SocketContext';
import Home1 from "./components/Home1";
import Home2 from "./components/Home2";

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



const App = () => {
    const { callAccepted, callEnded, leaveCall } = useContext(SocketContext);
    const classes = useStyles();
    return (
        <div>
        { 
            callAccepted && !callEnded ? (
                <Home2></Home2>
            ) : (
                <Home1> </Home1>
            )
        }
        </div>
    )
}
export default App;