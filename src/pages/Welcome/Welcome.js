import React from 'react';
import { Link } from 'react-router-dom';


export const Welcome = () => {

    return (
        <div>
            <h1>WELCOME PAGE</h1>
            <Link to="/login">Get Started</Link>
        </div>
    );
};