import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-2">
    <Container>
        <Row>
            <Col md={6}>
                {/* <h5>About Us</h5> */}
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus odio eget felis vestibulum, quis dignissim est ultricies.</p> */}
            </Col>
            {/* <Col md={3}>
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                    <li><a href="/">Home</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </Col> */}
            {/* <Col md={3}>
                <h5>Follow Us</h5>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                    <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
                    <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                </ul>
            </Col> */}
        </Row>
        <Row>
            <Col className="text-center mt-3">
                <p>&copy; 2024 Your Company. All Rights Reserved.</p>
            </Col>
        </Row>
    </Container>
</footer>
  )
}
