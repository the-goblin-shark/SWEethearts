import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const SubmitIdea = () => {
  return (
    <Container>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="whatIdea">
              <Form.Label>WHAT</Form.Label>
              <Form.Control type="text" placeholder="Name your idea..." />
              <Form.Control type="text" placeholder="Describe your idea..." />
            </Form.Group>

            <Form.Group controlId="why">
              <Form.Label>WHY</Form.Label>
              <Form.Text className="text-muted">
                Why do feel passionate about this idea?
              </Form.Text>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="how">
              <Form.Label>HOW</Form.Label>
              <Form.Text className="text-muted">
                What is the desired tech stack?
              </Form.Text>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="who">
              <Form.Label>WHO</Form.Label>
              <Form.Text>Desired Number of Teammates:</Form.Text>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="uploadImage">
              <Form.Label>Upload Image: </Form.Label>
              <Form.Text className="text-muted">
                for now, put a image source url
              </Form.Text>
              <Form.Control size="lg" type="text" />
            </Form.Group>

            <Form.Group controlId="when">
              <Form.Label>WHEN</Form.Label>
              <Form.Text className="text-muted">
                What do you want to start?
                <br />
                Note: This is also the date you will stop accepting new
                teammates.
              </Form.Text>
              <Form.Control type="date" />
              <Form.Text className="text-muted">
                When is the expected due date? (optional)
              </Form.Text>
              <Form.Control type="date" />
            </Form.Group>
            <div>
              <Button variant="primary" type="submit">
                SUBMIT IDEA
              </Button>
              {'   '}
              <Button href="/explore" variant="outline-primary" type="link">
                GO EXPLORE
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SubmitIdea;
