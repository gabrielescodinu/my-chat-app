import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Message from './Message';
import UserList from './UserSearch';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatUserId, setChatUserId] = useState('');

    useEffect(() => {
        const messagesRef = firebase.database().ref('messages');
        messagesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageArray = Object.values(data);
                setMessages(messageArray);
            }
        });
        return () => {
            messagesRef.off('value');
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newMessage.trim()) {
            const messagesRef = firebase.database().ref('messages');
            const currentUser = firebase.auth().currentUser;
            messagesRef.push({ text: newMessage, sender: currentUser.email });
            setNewMessage('');
        }
    };


    const handleNewMessage = (event) => {
        setNewMessage(event.target.value);
    };

    return (
        <div className="chat">
            <div className="user-search-container">
                <UserList />
            </div>
            <div className="message-list">
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input type="text" value={newMessage} onChange={handleNewMessage} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;