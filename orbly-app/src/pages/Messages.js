import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebase";
import { doc, onSnapshot, setDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Menu from "../components/Menu";
import ChatRooms from "../components/ChatRooms";
import "./styles/Messages.css";
import ChatArea from "../components/ChatArea";

const Messages = ({
    toggleTheme,
    theme,
    notifications,
}) => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
        } else {
            console.log('user is signed out');
        }
    });

    const [authUser, setAuthUser] = useState(null);

    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('user signed out');
            sessionStorage.clear();
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const usersCollection = collection(db, "users");
            onSnapshot(usersCollection, (snapshot) => {
                const usersData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersData);
            });
        }
        getUsers();
    }, []);

    const [selectedUser, setSelectedUser] = useState(null);
    const [messageText, setMessageText] = useState('');
    const messageID = uuidv4();

    const handleCreateMessage = (selectedUser) => {
        setDoc(doc(db, "messages", messageID), {
            sender: authUser.uid,
            receiver: selectedUser?.id,
            senderText: [
                {
                    messageID: messageID,
                    text: messageText,
                    timestamp: new Date(),
                    read: false,
                }
            ],
            receiverText: [
                {
                    messageID: messageID,
                    text: messageText,
                    timestamp: new Date(),
                    read: false,
                }
            ],
        });
        setMessageText('');
    }

    useEffect(() => {
        document.title = `Orbly - Messages ${notifications.length > 0 ? `(${notifications.length})` : ''}`;
    }, [ notifications ]);

    return ( 
        <div className='messages'>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
                notifications={notifications}
            />
            <ChatRooms 
                auth={auth}
                authUser={authUser}
                theme={theme}
                users={users}
                handleCreateMessage={handleCreateMessage}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
            <ChatArea 
                auth={auth}
                authUser={authUser}
                users={users}
                theme={theme}
            />
        </div>
    );
}
 
export default Messages;