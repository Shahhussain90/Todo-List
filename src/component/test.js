import React from 'react';
import { useSelector } from 'react-redux';

const Test = () => {
    const user = useSelector((state) => state.user.value); // Accessing the 'value' inside the user slice

    if (!user) {
        return <div>Loading........</div>; // Simplified loading indicator
    }

    return (
        <div>
            <h1>{user.password}</h1> 
            <h2>{user.email}</h2>
        </div>
    );
};

export default Test;
