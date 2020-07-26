import React from 'react'
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';

const NavigateBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      {/* TODO: Point this href to `/explore` if User is authenticated */}
      <Navbar.Brand href="/">Scratch Project</Navbar.Brand>
      {/* Set class for Login and Signup button Nav item to `margin-left: auto;`*/}
      <Nav className="ml-auto">
        <Nav.Link href="login">Login</Nav.Link>
        <Nav.Link href="signup">Signup</Nav.Link>
      </Nav>
    </Navbar>
  );

  // Search Bar Component
  // <Form inline>
  // <FormControl type="text" placeholder="Search" className="mr-sm-2" />
  // <Button variant="outline-light">Search</Button>
  // </Form>
}


export default NavigateBar;
