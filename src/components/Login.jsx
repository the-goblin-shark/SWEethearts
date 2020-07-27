import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login-signup.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';

const Login = (props) => {
  const { authStatus, setAuthStatus } = props;

  const [loginInputs, setLoginInputs] = useState({
    username: '',
    password: '',
  });

  //used to toggle error message if auth fails
  //as well as redirect if auth succeeds
  const [loginStatus, setLoginStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginInputs;
    const body = {
      username,
      password,
    };
    let response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200) {
      setLoginStatus(true);
      setAuthStatus({ isLoggedIn: true, username });
    } else setLoginStatus(false);
  };

  const setInput = (e) => {
    setLoginInputs({ ...loginInputs, [e.target.id]: e.target.value });
  };

  return loginStatus || authStatus.isLoggedIn ? (
    <Redirect to={{ pathname: '/explore' }} />
  ) : (
    <div className="login-container">
      <div className="login-box">
        <center>
          <h4>Welcome Back!</h4>
        </center>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Username"
              onChange={setInput}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={setInput}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <div className={loginStatus === false ? 'error-msg' : 'hidden'}>
            Sorry, your username/password was invalid.
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
