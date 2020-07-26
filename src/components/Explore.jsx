import React, {Fragment} from 'react';
import {Container, Col, Row, Form, Card, Button, CardDeck } from 'react-bootstrap'; 


const Explore = () => {

  // const generateTech = 
  const techStack = ['TECH1', 'TECH2', 'TECH1', 'TECH2', 'TECH1', 'TECH2', 'Tech 33'];

  const techGenerate = techStack.map( e => {
     return(<Form>
        <div key='checkbox' className="mb-5 mt-5 ml-5">
          <Form.Check type='checkbox'>
            <Form.Check.Input type='checkbox' isValid size='lg'/>
           <Form.Check.Label> {e} </Form.Check.Label>
          </Form.Check>
        </div>
      </Form>)
  })

  const ideaNames = ['idea1', 'idea2', 'idea3', 'idea4', 'idea5', 'idea6', 'idea7'];
  const ideaGenerate = ideaNames.map( e => {
    return (
      <Card style={{ width: '18rem' }} className='m-2'>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
              </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    )
  })
  
  const searchIdea = (
    <Form>
    <Form.Group controlId="formBasicEmail">
        <Form.Label> <h1>May your dream come true</h1> </Form.Label>
      <Form.Control size="lg" type="text" placeholder="Search your dream..." />
      <Button variant="primary" type="submit" className='mt-2'>
        Search your Dream
      </Button>
    </Form.Group>
    </Form>
  )

  const explorePage =
  (<Container fluid>
      <Row>
        <Col lg={3} className='mt-4'>
          <Row noGutters> <h2> Choose technology stack </h2></Row>
            {/* {techgenerate}; */}
          <div className=''>
            {techGenerate}
          </div>
        </Col>

        <Col lg={9} class="d-flex align-items-center" className='mt-4'>
          {searchIdea}
          <Row>
            {ideaGenerate}
          </Row>
        </Col>
      </Row>
  </Container>);

  return (<Fragment> {explorePage} </Fragment>);
};

export default Explore;
