import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';

const SubmitIdea = () => {
  const [retrievedTechStacks, setRetrievedTechStacks] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [why, setWhy] = useState('');
  const [techStacks, setTechStacks] = useState([]);
  const [who, setWho] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [whenStart, setWhenStart] = useState('');
  const [whenEnd, setWhenEnd] = useState('');

  // queryValue = [
  //   name,
  //   description,
  //   why,
  //   whenStart,
  //   whenEnd,
  //   teamNumber,
  //   imageURL,
  //   username,
  // ];

  // get request to backend to fetch tech stack data
  useEffect(() => {
    const fetchTechs = async () => {
      const results = await axios.get('/api/submit');
      // array of objects with id and name. need to filter for just names

      const techNamesList = results.data.map((el) => el.name);
      // console.log('techNamesList', techNamesList);
      setRetrievedTechStacks(techNamesList);
      // console.log('techStacks', techStacks);
    };

    fetchTechs();
    // console.log('techStacks', techStacks);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e;
    console.log('name', name);
    console.log('value', value);
    switch (name) {
      case 'ideaName':
        setName(value);
        console.log('name', name);
        break;
      default:
        console.log('not working');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted!');
  };

  return (
    <Container style={{ marginTop: 50 }}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>WHAT</Form.Label>
              <Form.Text className="text-muted">Name your idea</Form.Text>
              <Form.Control
                name="ideaName"
                value={name}
                onChange={handleChange}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Text className="text-muted">Describe your idea</Form.Text>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="why">
              <Form.Label>WHY</Form.Label>
              <Form.Text className="text-muted">
                Why do feel passionate about this idea?
              </Form.Text>
              <Form.Control type="text" />
            </Form.Group>

            {/* <Form.Group controlId="how">
              <Form.Label>HOW</Form.Label>
              <Form.Text className="text-muted">
                What is the desired tech stack?
              </Form.Text>
              <Form.Control type="text" />
            </Form.Group> */}
            <Form.Group>
              <Form.Label>HOW</Form.Label>
              <Form.Text className="text-muted">Choose your tech</Form.Text>
              <Typeahead
                id="techStacks"
                labelKey="name"
                multiple
                onChange={setTechStacks}
                options={retrievedTechStacks}
                selected={techStacks}
              />
            </Form.Group>

            <Form.Group controlId="who">
              <Form.Label>WHO</Form.Label>
              <Form.Text className="text-muted">
                Desired Number of Teammates
              </Form.Text>
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="primary" type="submit">
                SUBMIT IDEA
              </Button>
              {'   '}
              <Button
                href="/explore"
                style={{ marginLeft: 10 }}
                variant="outline-primary"
                type="link"
              >
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
