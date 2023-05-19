import React, { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./styles/ChatArea.css";

const ChatArea = ({
    authUser,
    theme,
    users,
    selectedMessage,
}) => {

    const navigate = useNavigate();

    const [messageText, setMessageText] = useState('');

    const handleSendMessage = () => {
        const messageID = uuidv4();
        const messageRef = doc(db, "messages", selectedMessage?.id);
        updateDoc(messageRef, {
            senderText: arrayUnion({
                messageID: messageID,
                sender: authUser?.displayName,
                text: messageText,
                timestamp: new Date(),
            }),
        });
        setMessageText('');
    }

    const [currentMessage, setCurrentMessage] = useState(null);

    useEffect(() => {
        const getCurrentMessage = async () => {
            const messageRef = doc(db, "messages", selectedMessage?.id);
            onSnapshot(messageRef, (doc) => {
                setCurrentMessage(doc.data());
            });
        }
        getCurrentMessage();
    }, [selectedMessage]);

    return ( 
        <div className='chat-area'>
            <div className="chat-area-header">
                <h3 className="chat-area-title">
                    {selectedMessage?.receiver === authUser?.uid ? users?.find((user) => user.id === selectedMessage?.sender)?.username : users?.find((user) => user.id === selectedMessage?.receiver)?.username}
                </h3>
            </div>
            <div className="chat-area-messages">
                {currentMessage?.senderText?.map((message) => (
                    <>
                        <div className={`chat-area-message ${message.sender === authUser?.displayName ? 'chat-area-message-sender' : 'chat-area-message-receiver'}`}>
                            <img src={message.sender === authUser?.displayName ? null : users?.find((user) => user.id === selectedMessage?.receiver)?.photoURL} alt="" className={message.sender === authUser?.displayName ? 'chat-area-image-sender' : 'chat-area-image-receiver'} onClick={() => navigate(`/${
                                selectedMessage?.receiver === authUser?.uid ? users?.find((user) => user.id === selectedMessage?.sender)?.username : users?.find((user) => user.id === selectedMessage?.receiver)?.username
                            }`)}/>
                            <p className={message.sender === authUser?.displayName ? 'chat-area-message-sender-text' : 'chat-area-message-receiver-text'}>
                                {message.text === null ? null : message.text}
                            </p>
                        </div>
                        <p className={`chat-area-message-timestamp ${message.sender === authUser?.displayName ? 'chat-area-message-timestamp-sender' : 'chat-area-message-timestamp-receiver'}`}>
                            {message.timestamp === null ? null : message.timestamp.toDate().toLocaleString(
                                'en-US', 
                                {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                }
                            )}
                        </p>
                    </>
                ))}
            </div>
            <div className="chat-area-input" onSubmit={() => handleSendMessage(selectedMessage)}>
                <input type="text" className="chat-area-input-text" placeholder="Type a message..." value={messageText} onChange={(e) => setMessageText(e.target.value)}/>
                <button className="chat-area-input-button" onClick={() => handleSendMessage(selectedMessage)}>
                    Send
                </button>
            </div>
        </div>
    );
}
 
export default ChatArea;