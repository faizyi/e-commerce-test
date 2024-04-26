import React, { useEffect } from 'react'
import { Col, Card, Button } from 'react-bootstrap';
export default function AddToCartSummary({cartItems}) {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  return (
    <Col md={4}>
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">Summary</h5>
      </Card.Header>
      <Card.Body>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
            Total Products
            <span>{totalQuantity}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
            <div>
              <strong>Total amount</strong>
            </div>
            <span><strong>${totalPrice}</strong></span>
          </li>
        </ul>
        <Button variant="primary" className="btn-lg btn-block">
          Go to checkout
        </Button>
      </Card.Body>
    </Card>
  </Col>
  )
}
