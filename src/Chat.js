import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Message from './Message';
import UserList from './UserList';
import UserSearch from './UserSearch';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    // const [chatUserId, setChatUserId] = useState('');

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
        <div className='flex'>
            <div className='bg-blue-900 overflow-scroll h-screen w-1/3'>
                <div className="user-search-container">
                    <UserSearch />
                    <UserList />
                </div>
            </div>
            <div className="chat bg-blue-800 overflow-scroll h-screen w-2/3 shadow-xl">

                <div className="message-list">
                    {messages.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="message-form p-8 bg-blue-600 absolute bottom-0 w-full shadow-xl">
                    <input className='p-4 rounded-xl outline-none mr-8 shadow-xl' placeholder="Send a message" type="text" value={newMessage} onChange={handleNewMessage} />
                    <button className='bg-blue-200 hover:bg-blue-400 p-4 rounded-xl shadow-xl' type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;