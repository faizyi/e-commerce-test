import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card,} from 'react-bootstrap';
import AddToCartSummary from '../../addtocartsummary/AddToCartSummary';
import { useAuthentication } from '../../../Services/useAuthentication';
import { getCartItems } from '../../../Services/addToCartService';
import Header from '../../header/Header';
import IncreaseItem from '../../increaseItem/IncreaseItem';
import { Loader } from '../../loader/Loader';
import { useDispatch,useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../../../redux/loaderSlice/LoaderSlice';
import DecreaseItem from '../../decreaseItem/DecreaseItem';
import DeleteItem from '../../deleteItem/DeleteItem';
import { TotalProducts } from '../../../Services/totalProducts';
export default function AddToCartPage() {
const {isLoading} = useSelector(state=>state.loader)
const dispatch = useDispatch();
  const { isAuthenticated, uid } = useAuthentication();
  const [cartItems, setCartItems] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  // const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        dispatch(showLoader());
        const cartItemsData = await getCartItems(uid);
        setCartItems(cartItemsData);
        // const totalQuantity = TotalProducts(cartItemsData);
        // setTotalQuantity(totalQuantity);
        setIsCartEmpty(cartItemsData.length === 0);
      } catch (error) {
        console.log('Error fetching cart items:', error);
      } finally {
        dispatch(hideLoader());
      }
    };
    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated, uid]);

  if(isCartEmpty) {
    return <p>
      <Header/>
      No items in cart
      </p>
  }

  return (
    <>
    <Header />
    {isLoading ? (
      <Loader />
    ) : (
      <section className="h-100 gradient-custom">
        <Container className="py-5">
          <Row className="justify-content-center my-4">
            <Col md={8}>
              {cartItems.map((item) => (
                <Card key={item.itemId} className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">{item.name}</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={3} md={12} className="mb-4 mb-lg-0">
                        <div className="bg-image hover-overlay hover-zoom ripple rounded">
                          <img src={item.image} className="w-100" alt={item.name} />
                          <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                        </div>
                      </Col>
                      <Col lg={5} md={6} className="mb-4 mb-lg-0">
                        <p><strong>{item.name}</strong></p>
                      </Col>
                      <Col lg={4} md={6} className="mb-4 mb-lg-0">
                        <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                            {item.quantity <= 1 ? <DeleteItem product={item}/> : <DecreaseItem product={item}/> }
                          <div className="form-outline">
                            <input id="form1" min="0" name="quantity" value={item.quantity}
                              type="number" className="form-control" />
                            <label className="form-label" htmlFor="form1">Quantity</label>
                          </div>
                          <IncreaseItem product={item} />
                        </div>
                        <p className="text-start text-md-center">
                          <strong>Total Price : ${item.totalPrice}</strong>
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>

            <AddToCartSummary cartItems={cartItems} />
          </Row>
        </Container>
      </section>
    )}
  </>
  );
}
