import React, { Fragment, useState, useEffect } from 'react';
import { Container, Col, Row, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Spinner from './Spinner';

const Explore = (props) => {
  const { authStatus } = props;
  const [response, setResponse] = useState([
    {
      idea_id: '',
      name: '',
      description: '',
      why: '',
      when_start: '',
      when_end: '',
      who: '',
      creator_username: '',
      image: '',
      techstacks: [],
    },
  ]);

  const [query, setQuery] = useState('');
  const [techList, setTechList] = useState([{ tech_id: '', name: '' }]);
  //for sort by tech stack functionality, if user checks off a tech, it gets added to array
  const [techFilter, setTechFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios.get('api/explore');
      // console.log('results.data', results.data);
      setResponse(results.data[0]);
      setTechList(results.data[1]);
      // console.log(results.data[0]);
    };

    fetchData();
  }, []);

  const handleTechFilter = (e) => {
    let newTechFilter;
    if (techFilter.includes(e.target.value)) {
      newTechFilter = techFilter.filter((tech) => tech !== e.target.value);
    } else newTechFilter = [...techFilter, e.target.value];
    setTechFilter(newTechFilter);
  };

  // get technologies
  const techStack = techList.map((tech) => tech.name);
  // Generate checkbox component for each technology
  const generateTech = techStack.map((tech, idx) => {
    return (
      <Form key={idx}>
        <div key="checkbox" className="mb-2 mt-2 ml-3">
          <Form.Check type="checkbox">
            <Form.Check.Input
              type="checkbox"
              isValid
              value={tech}
              onClick={handleTechFilter}
            />
            <Form.Check.Label className="ml-2">
              {' '}
              <h4 style={{ color: '#5e93a5' }}>{tech}</h4>{' '}
            </Form.Check.Label>
          </Form.Check>
        </div>
      </Form>
    );
  });

  const onChange = (q) => setQuery(q);

  const ideas = response;

  const sortedIdeas = ideas.filter((data) => {
    return data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });

  //check if user wants to filter for tech, otherwise just return sortedIdeas as-is
  const filteredIdeas = techFilter.length
    ? sortedIdeas.filter((idea) => {
        //if idea has tech that is inside techFilter, then include that idea
        for (let i = 0; i < techFilter.length; i++) {
          const selectedTech = techFilter[i];
          if (!idea.techstacks.includes(selectedTech)) return false;
        }
        return true;
      })
    : sortedIdeas;

  const generateBoxes = filteredIdeas.map((idea, idx) => {
    return (
      <Card key={idx} style={{ width: '20rem' }} className="m-3">
        <Card.Img variant="top" src={idea.image} />
        <Card.Body>
          <Card.Title>{idea.name}</Card.Title>
          <Card.Text style={{ fontWeight: 300 }}>{idea.description}</Card.Text>
          <Card.Text style={{ fontSize: 12, fontStyle: 'italic' }}>
            <span style={{ fontSize: 13, fontWeight: 'bold' }}>
              Tech Stack:{' '}
            </span>{' '}
            <br />
            {idea.techstacks.join(', ')}
          </Card.Text>
          <NavLink
            to={{
              pathname: '/idea',
              state: {
                idea_id: idea.idea_id,
                authStatus,
              },
            }}
          >
            <Button variant="primary"> Find out more </Button>
          </NavLink>
        </Card.Body>
      </Card>
    );
  });

  // Search box component
  const searchIdea = (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>
          {' '}
          <h1>May your dream come true</h1>{' '}
        </Form.Label>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Search your dream..."
          onChange={(e) => onChange(e.target.value)}
        />
        {/* <Button variant="primary" type="submit" className='mt-2'></Button> */}
      </Form.Group>
    </Form>
  );

  const explorePage = (
    <Container fluid>
      <Row>
        <Col lg={2} className="mt-4">
          <Row noGutters>
            {' '}
            <h4
              className="mb-4"
              style={{ fontStyle: 'italic', fontWeight: 400, marginTop: 130 }}
            >
              {' '}
              Choose your tech stack:{' '}
            </h4>
          </Row>
          <div className="">{generateTech}</div>
        </Col>

        <Col lg={9} class="d-flex align-items-center" className="mt-4">
          {searchIdea}
          <Row>{generateBoxes}</Row>
        </Col>
      </Row>
    </Container>
  );

  return response.length === 1 ? (
    <Spinner />
  ) : (
    <Fragment> {explorePage} </Fragment>
  );
};

export default Explore;
