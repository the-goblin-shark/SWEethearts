import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login-signup.css';
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

    console.log(registrationInputs);

    // let response = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // });

    //TO-DO: NEED TO SEE WHAT BACKEND SENDS BACK
    // let response = 'succes';
    // if (response !== 'success') setErrorMsg(true);
    // else setErrorMsg('Your information was not valid');
  };

  const setInput = (e) => {
    setRegistrationInputs({
      ...registrationInputs,
      [e.target.id]: e.target.value,
    });
  };

  //   if (loginStatus)
  //     return <Redirect to={{ pathname: '/explore', state: { username } }} />;

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
