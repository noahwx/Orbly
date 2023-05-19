import React, { useState, useEffect, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import CreateMessageDark from "../Assets/CreateMessageDark.svg";
import CreateMessageLight from "../Assets/CreateMessageLight.svg";
import CreateMessageModal from "./modals/CreateMessageModal";
import PostMenuDark from "../Assets/PostMenuDark.svg";
import PostMenuLight from "../Assets/PostMenuLight.svg";
import "./styles/ChatRooms.css";
import ChatArea from "./ChatArea";

const ChatRooms = ({
    authUser,
    theme,
    handleCreateMessage,
    users,
    selectedUser,
    setSelectedUser,
}) => {

    const [createMessage, setCreateMessage] = useState(false);
    const createMessageRef = useRef(null);

    const handleOpenCreateMessage = () => {
        setCreateMessage(!createMessage);
    }

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if(createMessageRef.current && createMessage && !createMessageRef.current.contains(e.target)){
                setCreateMessage(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [createMessageRef, createMessage]);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            const messagesRef = collection(db, "messages");
            onSnapshot(messagesRef, (snapshot) => {
                const messagesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(messagesData);
            });
        }
        getMessages();
    }, []);

    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
    }

    return ( 
        <div className='chat-rooms'>
            <div className="chat-rooms-header">
                <h3 className="chat-rooms-title">
                    {authUser?.displayName}
                </h3>
                {theme === 'light' ? (
                    <button className="create-message-button" onClick={() => handleOpenCreateMessage()}>
                        <img src={CreateMessageDark} alt="Create Message" />  
                    </button>
                ) : (
                    <button className="create-message-button" onClick={() => handleOpenCreateMessage()}>
                        <img src={CreateMessageLight} alt="Create Message" />
                    </button>  
                )}
            </div>
            <div className="chat-rooms-list">
                {messages?.filter((message) => message?.sender === authUser?.uid || message?.receiver === authUser?.uid).map((message) => (
                    <div className={`chat-rooms-list-item ${selectedMessage?.id === message?.id ? 'chat-rooms-list-item-selected' : ''}`} onClick={() => handleSelectMessage(message)}>
                        <img src={users?.find((user) => user.id === message?.receiver)?.photoURL} alt="User" className="chat-rooms-list-item-user-image" />
                        <p className="chat-rooms-list-item-username">
                            {message?.receiver === authUser?.uid ? users?.find((user) => user.id === message?.sender)?.username : users?.find((user) => user.id === message?.receiver)?.username}
                        </p>
                        <p className="chat-rooms-list-item-text">
                            {message?.senderText?.slice(-1)[0]?.text === null ? null : message?.senderText?.slice(-1)[0]?.text}
                        </p>
                        {theme === 'light' ? (
                            <img src={PostMenuDark} alt="Menu" className="chat-rooms-list-item-menu" />
                        ) : (
                            <img src={PostMenuLight} alt="Menu" className="chat-rooms-list-item-menu" />
                        )}
                    </div>
                ))}
            </div>
            {createMessage && 
                <CreateMessageModal 
                    authUser={authUser}
                    createMessage={createMessage}
                    createMessageRef={createMessageRef}
                    handleCreateMessage={handleCreateMessage}
                    users={users}
                    theme={theme}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    handleOpenCreateMessage={handleOpenCreateMessage}
                />
            }
            <ChatArea 
                authUser={authUser}
                selectedMessage={selectedMessage}
                users={users}
            />
        </div>
    );
}
 
export default ChatRooms;