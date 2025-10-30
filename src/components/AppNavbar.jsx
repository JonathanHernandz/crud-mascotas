import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AppNavbar() {
  const [showMenu, setShowMenu] = useState(false);

  const handleClose = () => setShowMenu(false);
  const handleShow = () => setShowMenu(true);

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand={false} // 🔹 Hamburguesa siempre visible
        className="shadow-sm py-2 px-3"
      >
        <Container fluid className="d-flex align-items-center justify-content-between">
          {/* 🔹 Icono hamburguesa + título */}
          <div className="d-flex align-items-center">
            <Navbar.Toggle
              aria-controls="offcanvasNavbar"
              onClick={handleShow}
              className="border-0 me-2"
            />
            <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
              CRUD Pet
            </Navbar.Brand>
          </div>
        </Container>
      </Navbar>

      {/* 🔹 Menú lateral más pequeño */}
      <Offcanvas
        id="offcanvasNavbar"
        show={showMenu}
        onHide={handleClose}
        placement="start"
        className="bg-primary text-white small-sidebar"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleClose}
              className="text-white fs-6"
            >
              🐾 Ver Mascotas
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/add"
              onClick={handleClose}
              className="text-white fs-6"
            >
              ➕ Agregar Mascota
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
