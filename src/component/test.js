import React from 'react';
import { useSelector } from 'react-redux';

const Test = () => {
    const user = useSelector((state) => state.user.value);

    if (!user || typeof user !== 'object') {
        return <div>Loading...</div>;
    }

    const { name, email } = user;

    return (
        <div>
            <h1 style={{ color: 'white' }}>{name || 'Name not available'}</h1>
            <h2 style={{ color: 'white' }}>{email || 'Email not available'}</h2>
        </div>
    );
};

export default Test;