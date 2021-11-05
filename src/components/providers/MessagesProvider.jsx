import { createContext, useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { firestore } from "../../firebase";

export const MessagesContext = createContext([]);

const MessagesProvider = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    const q = query(messagesRef, orderBy("timeSent", "desc"), limit(15));

    const unsubscribeFromFiresore = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        return data;
      });
      if (newMessages.length > 1) {
        setMessages(newMessages.reverse());
      }
    });

    return () => {
      unsubscribeFromFiresore();
    };
  }, []);

  return (
    <MessagesContext.Provider value={messages}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
