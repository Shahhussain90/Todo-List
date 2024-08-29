import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import './log_reg.css';

const Register = () => {
    const history = useHistory();
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = input.email;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const password = input.password;
        const passwordRegex = /^[A-Za-z\d@$!%*?&]{8,}$/;
    
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email");
        } else {
            setEmailError('');
        }
    
        if (!passwordRegex.test(password)) {
            setPasswordError("Password is not valid");
        } else {
            setPasswordError('');
        }
    
        if (emailRegex.test(email) && passwordRegex.test(password)) {
            Cookies.set("user", JSON.stringify(input), { expires: 1 }); // expires in 1 day
            history.push("/login");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputname1" className="form-label">name</label>
                <input type="text" name='name' onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} value={input.name} className="form-control" id="exampleInputname1" required />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name='email' onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} value={input.email} className="form-control" id="exampleInputEmail1"  aria-describedby="emailHelp" />
                {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name='password' onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} value={input.password} className="form-control" id="exampleInputPassword1"  />
                {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Register;