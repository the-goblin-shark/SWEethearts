import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login-signup.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';

const Signup = () => {
  const [registrationInputs, setRegistrationInputs] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [registerStatus, setRegisterStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, email, confirmPassword } = registrationInputs;
    if (password !== confirmPassword)
      return setErrorMsg(`Passwords don't match!`);

    const body = {
      username,
      password,
      email,
    };

    let response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200) setRegisterStatus(true);
    else
      setErrorMsg('New user could not be created - duplicate username/email');
  };

  const setInput = (e) => {
    setRegistrationInputs({
      ...registrationInputs,
      [e.target.id]: e.target.value,
    });
  };

  if (registerStatus)
    return (
      <Redirect
        to={{
          pathname: '/explore',
          state: { username: registrationInputs.username },
        }}
      />
    );

  return (
    <div className="login-container">
      <div className="login-box">
        <center>
          <h4>Welcome!</h4>
        </center>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Username"
              onChange={setInput}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={setInput}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={setInput}
              required
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={setInput}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="error-msg">{errorMsg}</div>
      </div>
    </div>
  );
};

export default Signup;
