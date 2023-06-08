import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ErrorMsg = styled.p`
  color: red;
  margin-top: 5px;
  font-size: 14px;
`;



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    // Reset previous error/success messages
    setEmailError('');
    setPasswordError('');
    setErrorMsg('');

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    if (password.length < 8 || password.length > 16) {
      setPasswordError('Password must be between 8 and 16 characters');
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      setPasswordError('Password can only contain alphanumeric characters');
      return;
    }

    // Perform login request
    axios
      .post('/api/login', { email, password })
      .then((response) => {
        // Handle successful login and redirection
        console.log(response.data);
        setErrorMsg('Login successful');
      })
      .catch((error) => {
        // Handle login failure and display error message
        console.error(error);
        if (error.response && error.response.status === 401) {
          setErrorMsg('Invalid email or password');
        } else {
          setErrorMsg('Login failed');
        }
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(''); // Clear email error when the input value changes
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <LoginForm>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <ErrorMsg>{emailError}</ErrorMsg>}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <ErrorMsg>{passwordError}</ErrorMsg>}
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <Button type="button" onClick={handleLogin}>
          Login
        </Button>
      </LoginForm>
    </LoginContainer>

  );
};

export default Login;
