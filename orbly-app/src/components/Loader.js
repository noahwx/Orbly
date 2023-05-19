import React from "react";
import logo from "../Assets/logo.svg";
import logoLight from "../Assets/logoLight.svg";
import "./styles/Loader.css";

const Loader = ({
    theme, 
}) => {

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            window.location.reload();
        }, 1000);
    }, []);

    console.log(loading);

    return ( 
        <>
            <div className="loader-container">
                {theme === 'light' ?
                    <img className="loader-logo" src={logo} alt="Orbly Logo" />
                :
                    <img className="loader-logo" src={logoLight} alt="Orbly Logo" />
                } 
                <div className="loader">
                    <div className="loader-spinner"></div> 
                </div>
            </div>
        </>
    );
}
 
export default Loader;