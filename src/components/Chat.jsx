import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';

export default function Chat() {
  return (
    <div className="grid grid-cols-1">
      <Messages />
      <MessageInput />
    </div>
  )
}
