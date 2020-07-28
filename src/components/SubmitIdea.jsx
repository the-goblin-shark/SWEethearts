import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';

const SubmitIdea = (props) => {
  const { authStatus } = props;
  const { username } = authStatus;

  const [retrievedTechStacks, setRetrievedTechStacks] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [why, setWhy] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [teamNumber, setTeamNumber] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [whenStart, setWhenStart] = useState('');
  const [whenEnd, setWhenEnd] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'why':
        setWhy(value);
        break;
      case 'who':
        setTeamNumber(value);
        break;
      case 'uploadImage':
        setImageURL(value);
        break;
      default:
        console.log('not working');
    }
  };

  // helper function to convert tech stack into tech stack id
  const techIDConverter = (techs) => {
    const result = techs.map((el) => retrievedTechStacks.indexOf(el) + 1);
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // convert tech stack into tech stack id
    const techStackID = techIDConverter(techStack);

    const data = {
      name,
      description,
      why,
      techStack: techStackID,
      whenStart,
      whenEnd,
      teamNumber,
      imageURL,
      // hardcode, need a logic to pass username as prop
      username,
    };
    // console.log('data', data);
    await axios.post('/api/submit', data);
    setIsSubmitted(true);
  };

  return isSubmitted ? (
    <div
      style={{
        marginTop: 50,
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>
        You submitted your idea successfully!
      </h1>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 15,
        }}
      >
        <Button variant="primary" onClick={() => setIsSubmitted(false)}>
          SUBMIT ANOTHER ONE
        </Button>
        <Button
          href="/explore"
          style={{ marginLeft: 10 }}
          variant="outline-primary"
          type="link"
        >
          GO EXPLORE IDEAS
        </Button>
      </div>
    </div>
  ) : (
    <Container style={{ marginTop: 50 }}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>WHAT</Form.Label>
              <Form.Text className="text-muted">Name your idea</Form.Text>
              <Form.Control
                name="ideaName"
                onChange={handleChange}
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Text className="text-muted">Describe your idea</Form.Text>
              <Form.Control onChange={handleChange} type="text" />
            </Form.Group>

            <Form.Group controlId="why">
              <Form.Label>WHY</Form.Label>
              <Form.Text className="text-muted">
                Why do feel passionate about this idea?
              </Form.Text>
              <Form.Control onChange={handleChange} type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label>HOW</Form.Label>
              <Form.Text className="text-muted">Choose your tech</Form.Text>
              <Typeahead
                id="techStacks"
                labelKey="name"
                multiple
                onChange={setTechStack}
                options={retrievedTechStacks}
                selected={techStack}
              />
            </Form.Group>

            <Form.Group controlId="who">
              <Form.Label>WHO</Form.Label>
              <Form.Text className="text-muted">
                Desired Number of Teammates
              </Form.Text>
              <Form.Control onChange={handleChange} type="text" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="uploadImage">
              <Form.Label>Upload Image: </Form.Label>
              <Form.Text className="text-muted">
                for now, put a image source url
              </Form.Text>
              <Form.Control onChange={handleChange} size="lg" type="text" />
            </Form.Group>

            <Form.Group controlId="whenStart">
              <Form.Label>WHEN</Form.Label>
              <Form.Text className="text-muted">
                What do you want to start?
                <br />
                Note: This is also the date you will stop accepting new
                teammates.
              </Form.Text>
              <Form.Control
                onChange={(e) => setWhenStart(e.target.value)}
                type="date"
              />
            </Form.Group>
            <Form.Group controlId="whenEnd">
              <Form.Text className="text-muted">
                When is the expected due date? (optional)
              </Form.Text>
              <Form.Control
                onChange={(e) => setWhenEnd(e.target.value)}
                type="date"
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="primary" type="submit">
                SUBMIT
              </Button>
              {'   '}
              <Button
                href="/explore"
                style={{ marginLeft: 10 }}
                variant="outline-primary"
                type="link"
              >
                CANCEL
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SubmitIdea;
