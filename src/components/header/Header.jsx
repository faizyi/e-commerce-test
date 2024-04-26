import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Logout from '../logout/logout';
import { useAuthentication } from '../../Services/useAuthentication';
import { TotalProducts } from '../../Services/totalProducts';
export default function Header() {
    const location = useLocation();
    const userData = location.state ? location.state.userData : null;
    const adminData = location.state ? location.state.adminData : null;
    const { isAuthenticated, uid } = useAuthentication();
  return (
    <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand as={Link}>
            Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav className="ml-auto">
                <Nav.Link as={Link} to="/addtocart" className="position-relative">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    <span className="position-absolute top-1 start-0 translate-middle 
                    badge rounded-pill bg-danger">
                         0
                    </span>
                </Nav.Link>
                <Nav.Item className="ml-3">
                    {isAuthenticated ? <Logout /> : <Button as={Link} to="/login" 
                    variant="outline-primary">Login</Button>}
                </Nav.Item>
                {adminData && <Button as={Link} to="/addproduct" 
                variant="outline-primary">Add Product</Button>}
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
  )
}
