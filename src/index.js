import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import "./index.module.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
                                