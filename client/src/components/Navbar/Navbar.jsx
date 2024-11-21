import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import "./Navbar.css";

export default function GlobalNavbar() {
  return (
    <>
      <Navbar expand="lg" className="bg-primary bg-gradient mb-3" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Recipe Book</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/recipes/new">Add Recipe</Nav.Link>
              <Nav.Link href="/recipes">Recipes</Nav.Link>
              <Nav.Link href="/ingredients">Ingredients</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
