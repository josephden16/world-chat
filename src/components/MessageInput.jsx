import React, { useContext, useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { AuthContext } from "./providers/AuthProvider";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const user = useContext(AuthContext);
  const inputRef = useRef(null);

  const clearInput = () => {
    setMessage("");
    inputRef.current.value = "";
  }

  const sendMessage = async () => {

    if (!user) {
      alert("You must be signed in to send a message");
      return;
    }

    if (!message || message.length < 1) {
      return;
    }

    const messagesRef = collection(firestore, "messages");

    try {
      await addDoc(messagesRef, {
        text: message,
        senderPhotoURL: user.photoURL,
        timeSent: new Date(),
        senderName: user.displayName,
        senderId: user.uid
      });
      clearInput();
    } catch {
      alert("An error occurred and your message was unable to send.");
    }
  };

  return (
    <div className="bg-secondary w-full py-3 px-2 lg:px-3 fixed bottom-0 opacity-100" style={{zIndex: 9999}}>
      <div className="flex flex-row items-center justify-between w-full space-x-2">
        <input
          type="text"
          name="message"
          placeholder="Type a message"
          id="message"
          className="outline-none bg-white border-2 border-white rounded-3xl px-3 py-2 w-full focus:border-primary transition-colors duration-200"
          onChange={(evt) => setMessage(evt.target.value)}
          ref={inputRef}
        />
        <button
          onClick={sendMessage}
          className="px-3 py-3 rounded-circle bg-primary"
        >
          <img
            src="/paper-plane.png"
            className="w-6 mx-auto my-auto"
            alt="send"
          />
        </button>
      </div>
    </div>
  );
}
