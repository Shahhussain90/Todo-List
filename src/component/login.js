import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { login } from '../features/user';
import './log_reg.css';

const Login = () => {
  
  const history = useHistory();
  const [input, setInput] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const loggedUser = Cookies.get('user');
    if (loggedUser) {
      const userData = JSON.parse(loggedUser);
      if (input.email === userData.email && input.password === userData.password) {
        dispatch(login({ email: input.email, password: input.password }));
        console.log('Login dispatched with:', { email: input.email, password: input.password });
        history.push("/");
      } else {
        setLoginError("Invalid Email or Password!");
      }
    } else {
      setLoginError("User not found!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = input.email;
    const password = input.password;

    if (!validateEmail(email)) {
      setEmailError("Invalid email");
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError("Password is not valid minimum 8 letters");
    } else {
      setPasswordError('');
    }

    if (validateEmail(email) && validatePassword(password)) {
      handleLogin(e);
    }
  };
  const dispatch = useDispatch();
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          name='email'
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          value={input.email}
          className="form-control"
          id="email"
        />
        {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          name='password'
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          value={input.password}
          className="form-control"
          id="password"
        />
        {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
      </div>
      {loginError && <span style={{ color: 'red' }}>{loginError}</span>}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;
