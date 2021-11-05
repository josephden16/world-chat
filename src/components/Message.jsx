import React from "react";

export default function Message({ message, user }) {
  return (
    <div className="flex flex-row flex-nowrap space-x-1">
      <div>
        <img
          src={message.senderPhotoURL}
          alt={message.senderName}
          className="rounded-circle w-8 h-8"
        />
      </div>
      <div>
        <div className="text-black text-sm">{message.senderName}</div>
        <div
          className={`${
            user?.uid === message.senderId ? "bg-primary" : "bg-gray-400"
          } rounded-lg px-2 py-2 text-white text-sm inline-block shadow-md`}
          style={{ wordBreak: "break-word" }}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}
