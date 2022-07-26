import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Layout = () => {
  return (
    <>
     <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/category">Category</Nav.Link>
              <Nav.Link href="/emails">Emails</Nav.Link>
              <Nav.Link href="/editor">Send NewsLetter </Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
     </Navbar>
    <Outlet />
    </>
  )
};

export default Layout;