import React, { Fragment } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

/*
 * HELPER FUNCTION: nextPath
 * Push `path` to Landing component's destructured `history` prop 
 * (provided by invoking withRouter on Landing component before export) 
 */
const redirectToPath = (history, path) => {
  history.push(path);
}

const Landing = ({ history }) => {
  return (
    <Container>
      <Row>
        {/* Center landing page text by placing in middle column */}
        <Col></Col>
        <Col>
          <Fragment>Welcome to Scratch Project</Fragment><br />
          <Fragment>A place where developers make their dreams come true</Fragment><br />
          <Button onClick={() => redirectToPath(history, '/explore')}
            size='lg'
            variant='outline-primary' block>
            Start Exploring
          </Button>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default withRouter(Landing);
