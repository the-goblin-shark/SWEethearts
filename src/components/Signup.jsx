import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login-signup.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';

const Signup = (props) => {
  const { authStatus, setAuthStatus } = props;

  const [registrationInputs, setRegistrationInputs] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [registerStatus, setRegisterStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      password,
      email,
      confirmPassword,
      firstname,
      lastname,
    } = registrationInputs;
    if (password !== confirmPassword)
      return setErrorMsg(`Passwords don't match!`);

    const body = {
      username,
      password,
      email,
      firstname,
      lastname,
    };

    let response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200) {
      setRegisterStatus(true);
      setAuthStatus({ isLoggedIn: true, username });
    } else
      setErrorMsg('New user could not be created - duplicate username/email');
  };

  const setInput = (e) => {
    setRegistrationInputs({
      ...registrationInputs,
      [e.target.id]: e.target.value,
    });
  };

  return registerStatus || authStatus.isLoggedIn ? (
    <Redirect
      to={{
        pathname: '/explore',
      }}
    />
  ) : (
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

          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="firstname"
              placeholder="First Name"
              onChange={setInput}
              required
            />
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="lastname"
              placeholder="Last Name"
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
