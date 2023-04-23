import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

function Message(props) {
  const currentUser = firebase.auth().currentUser;

  const { message } = props;
  const isMine = message.sender === currentUser.email;
  return (
    <div className={`message ${isMine ? "bg-gradient-to-r from-purple-500 to-blue-500 m-8 w-fit p-4 text-white rounded-xl" : "bg-gradient-to-r from-teal-500 to-blue-500 m-8 w-fit p-4 text-white rounded-xl"}`}>
      <p>{message.text}</p>
      <small>{message.sender}</small>
    </div>
  );
}

export default Message;
