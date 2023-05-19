import React from "react";
import "./styles/NotFoundPage.css";

const NotFoundPage = () => {
    return ( 
        <div className="notfoundpage">
            <h1 className="notfoundpage-title">404</h1>
            <h2 className="notfoundpage-subtitle">Page Not Found</h2>
            <p className="notfoundpage-text">The page you are looking for does not exist.</p>
        </div>
    );
}
 
export default NotFoundPage;