import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login-signup.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
  const [loginInputs, setLoginInputs] = useState({
    username: '',
    password: '',
  });

  //for error message, maybe change to better name
  const [loginStatus, setLoginStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginInputs;

    const body = {
      username,
      password,
    };

    // let response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // });

    //TO DO: NEED TO SEE WHAT BACKEND SENDS BACK
    //PLACEHOLDER FOR NOW
    let response = 'success';

    if (response === 'success') setLoginStatus(true);
    else setLoginStatus(false);
  };

  const setInput = (e) => {
    setLoginInputs({ ...loginInputs, [e.target.id]: e.target.value });
  };

  if (loginStatus)
    return <Redirect to={{ pathname: '/explore', state: { username } }} />;

  return (
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
