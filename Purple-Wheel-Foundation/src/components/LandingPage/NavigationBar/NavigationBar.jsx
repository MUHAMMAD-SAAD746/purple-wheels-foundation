import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <nav className="navigation-bar">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/business">Our Business</a>
            <a href="/journey">Our Journey</a>
            <a href="/gallery">Gallery</a>
        </nav>
    );
};

export default NavigationBar;
