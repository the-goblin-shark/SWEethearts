import React, { Fragment, useState, useEffect } from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap';
import '../styles/user-profile.scss';

const Profile = (props) => {

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
  };

  /* 
   * PROFILE COMPONENT USER FLOW:

   *   Case 1: Viewing your own profile (READ and WRITE)
   *       On first render, display all data in this DB row (distinguished by `username`)
   *       
   *       If current User clicks edit, then submit:
   *         1a. Send all data stored from initial GET request
   *         1b. Except for the modified fields, whose values will be set to User input
   * 
   *   Case 2: Viewing another User's profile (whether or not you're a registered user)
   *     Same page without edit button functionality (READ-ONLY)
  */
  return (
    <Container id='userProfileContainer'>
      <Row className='mb-4' id='row1'>
        <h3>
          {'Somebody'}'s Developer Profile
        </h3>
        <img id='profilePic' src='https://www.clker.com/cliparts/Z/j/o/Z/g/T/turquoise-anonymous-man-hi.png' />
      </Row>
      <Row id='row2'>
        <Col className='cardHeader' id='bioCard'>
          <Fragment>Bio</Fragment>
        </Col>
        <Col className='cardHeader ml-5' id='contactInfoCard'>
          <Fragment>Where else can your future teammates contact you?</Fragment>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
