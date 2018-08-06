import React from 'react';

import { Navbar, Nav, NavItem} from 'react-bootstrap';

export default function CustomNavBar(props) {
    return (
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a>Contact List</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} onClick={props.createNewContact}>
                        Create Contact
                    </NavItem>
                    <NavItem eventKey={3} onClick={props.deleteContact}>
                        Delete Contact
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}