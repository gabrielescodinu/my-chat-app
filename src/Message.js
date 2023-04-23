import React from 'react';

function Message(props) {
  const { message, isMine } = props;
  return (
    <div className={`message ${isMine ? "mine" : ""}`}>
      <p>{message.text}</p>
      <small>{message.sender}</small>
    </div>
  );
}

export default Message;
