import React, {createContext, useState, useRef, useEffect} from "react";
import io from 'socket.io-client';
import Peer from 'simple-peer'; 

const SocketContext = createContext();
const moment = require('moment');

var chat_box = null;

const setChat = (e) => {
    chat_box = e;
}


const socket = io('https://video-chat-backend-old.herokuapp.com');

const ContextProvider = ({ children }) => {
    const [stream , setStream] = useState();
    const [me, setMe] = useState('');
    const [call, setCall] = useState({}); 
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    // new additions
    const [messages, setMessages] = useState([]);
    const [note, setNote] = useState({
        'name': name,
        'time': "",
        "value": '',
        'fromme': true,
        'id': me,
    });

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const [chatBox, setChatBox] = useState(null);


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true, video: true})
        .then((ourStream) => {
            setStream(ourStream);
            myVideo.current.srcObject = ourStream;
        })

        socket.on('me' , (id) => {
            setMe(id);
        })

        socket.on('callUser',  ({from, name: callerName, signal}) => {
            setCall({isRecievedCall: true, from, name: callerName, signal   })
        })

        socket.on('message', (message) => {
            setMessages(prevMessages => {
                if (prevMessages.length !== 0) {
                    if (prevMessages[prevMessages.length - 1].value !== message.value) {
                        setMessages(prevMessages => {
                            return [...prevMessages, message];
                        });
                    }
                }
                else {
                    return [...prevMessages, message];
                }
    
                return [...prevMessages];
            });
                chat_box.scrollTop = chat_box.scrollHeight;
        })
    }, []);

    const addMessage = (event) => {

        note.time = moment().format('h:mm a');
        setMessages(prevMessages => {
            return [...prevMessages, note];
        });
        setNote(prevNote => {
            prevNote.fromme = false;
            return prevNote;
        });
        socket.emit("chatMessage", { "msg": note, "id": call.from });
        setNote(prevNote => {
            return {
                ...prevNote,
                "value": "",
                "fromme": true
            };
        });
        event.preventDefault();
    }


    const answerCall = () =>{
        setCallAccepted(true);

        const peer = new Peer({initiator: false, trickle: false, stream});

        peer.on('signal' , (data) => {
            socket.emit('answerCall' , {signal: data, to: call.from});
        });

        peer.on('stream' , (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;

    };

    const callUser = (id) =>{
        const peer = new Peer({initiator: true, trickle: false, stream});

        peer.on('signal' , (data) => {
            socket.emit('callUser' , {userToCall: id, signalData: data, from: me, name});
        });

        peer.on('stream' , (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;

    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();

    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
            messages, 
            setMessages,
            note, 
            setNote,
            addMessage,
        }}>
            {children}
        </SocketContext.Provider>
    )

};

export {ContextProvider, SocketContext, setChat};