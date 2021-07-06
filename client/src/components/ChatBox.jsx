import React, { useContext, useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core';

import "./ChatBox.css";
import Message from "./Message";
import { SocketContext, setChat } from "./SocketContext";
import { ContactsOutlined, SportsHockeyRounded } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    chatdiv: {
        padding: '30px',
        maxHeight: '500px',
        overflowY: 'scroll',
    },
    message: {
        padding: '10px',
        marginBottom: '15px',
        borderRadius: ' 5px',
    }

}));


const ChatBox = () => {
    const classes = useStyles();
    const { callAccepted, callEnded , me, call, name } = useContext(SocketContext);
    const { messages, setMessages, note, setNote, addMessage, chatBox, setChatBox } = useContext(SocketContext);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });

    }

    return (callAccepted && !callEnded && (
        <div class={"chat-container"} id="chat-messages-container">
            <div class="chat-form-container">
                <div class="text-in-title"> Video ChatBox</div>
            </div>
            <div className="chat-messages" id="this-chat-container" ref={(s) => (setChat(s))} >

                {messages.map((noteItem, index) => {
                    return (
                        <Message
                            key={index}
                            id={index}
                            time={noteItem.time}
                            name={noteItem.name}
                            title={noteItem.value}
                            fromme={noteItem.fromme}
                        />
                    );
                })}
            </div>
            <div class="chat-form-container">
                <form id="chat-form">
                    <input
                        id="msg"
                        name='value'
                        type="text"
                        onChange={handleChange}
                        value={note.value}
                        placeholder="Enter Message"
                        autoComplete="off"
                    />
                    <button class="btn" onClick={addMessage} ><i class="fas fa-paper-plane"></i> Send</button>
                </form>
            </div>
        </div>))

}

export default ChatBox;