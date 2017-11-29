import {Navbar, Nav, NavItem} from 'react-bootstrap';
import * as React from 'react';

const CustomNavbar = ({openModal, updateData, toggleScreen, buttonName}) =>
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Captur</a>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
      <Nav>
        <NavItem onClick={updateData}>All Today</NavItem>
        <NavItem onClick={openModal}>New</NavItem>
        <NavItem onClick={toggleScreen}>{buttonName}</NavItem>
      </Nav>
    </Navbar>

export default CustomNavbar;
