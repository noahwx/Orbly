import React, { useState } from "react";
import SearchDark from "../../Assets/SearchDark.svg";
import SearchLight from "../../Assets/SearchLight.svg";
import './styles/CreateMessageModal.css';

const CreateMessageModal = ({
    authUser,
    createMessage,
    createMessageRef,
    handleCreateMessage,
    users,
    theme,
    handleOpenCreateMessage,
}) => {

    const [search, setSearch] = useState('');

    return ( 
        <>  
            {createMessage && (
                <div className="create-message-background">
                    <div className="create-message-modal" ref={createMessageRef}>
                        <div className="create-message-header">
                            <h3 className="create-message-title">
                                Create Message
                            </h3>
                            <button className="create-message-close-button" onClick={() => handleOpenCreateMessage()}>
                                <span className="create-message-close-button-text">
                                    Close
                                </span>
                            </button>
                        </div>
                        <div className="create-message-user-search">
                            {theme === 'light' ? (
                                <img className="create-message-user-search-icon" src={SearchDark} alt="Search" />
                            ) : (
                                <img className="create-message-user-search-icon" src={SearchLight} alt="Search" />
                            )}
                            <input className="create-message-user-search-input" type="text" placeholder="Search for a user..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                            {users.filter((user) => user?.username.toLowerCase().includes(search.toLowerCase())).filter((user) => user.username !== authUser.displayName).slice(0, 5).map((user) => (
                                <div className="create-message-user" key={user.uid}>
                                    <img className="create-message-user-avatar" src={user.photoURL} alt="User Avatar" />
                                    <span className="create-message-user-name">
                                        {user.username}
                                    </span>
                                    <button className="create-message-user-button" onClick={() => handleCreateMessage(user)}>
                                        <span className="create-message-user-button-text">
                                            Message
                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
 
export default CreateMessageModal;