import React, { useContext } from "react";
import { MessagesContext } from "./providers/MessagesProvider";
import Message from "./Message";
import { AuthContext } from "./providers/AuthProvider";

export default function Messages() {
  const messages = useContext(MessagesContext);
  const user = useContext(AuthContext);

  return (
    <div className="mt-4 mb-20 mx-2 flex flex-col justify-end space-y-2 overflow-x-hidden">
      {Array.isArray(messages) &&
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message.id} message={message} user={user} />
        ))}
    </div>
  );
}
