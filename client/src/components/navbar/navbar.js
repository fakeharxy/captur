import {Navbar, Nav, NavItem, FormGroup, FormControl, Button} from 'react-bootstrap';
import * as React from 'react';

const CustomNavbar = ({openModal}) =>
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Captur</a>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
      <Nav>
        <NavItem onClick={openModal}>New</NavItem>
      </Nav>
    </Navbar>

export default CustomNavbar;
