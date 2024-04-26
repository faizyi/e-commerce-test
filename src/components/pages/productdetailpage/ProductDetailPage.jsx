import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductsById } from '../../../Services/product.service';
import { Card,Image  } from 'react-bootstrap';
import Header from '../../header/Header';
import AddTocart from '../../addtocart/AddTocart';
import { useDispatch,useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../../../redux/loaderSlice/LoaderSlice';
import { Loader } from '../../loader/Loader';
export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loader);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            dispatch(showLoader());
            const singleProductData = await getProductsById(id,dispatch);
            setProduct(singleProductData);
          } catch (error) {
            console.error('Error fetching products:', error);
          } finally {
            dispatch(hideLoader());
          }
        };
        fetchProduct();
    }, [id]);
    if(!product) return <div><Loader/></div>
  return (
    <>
    <Header/>
    <div className="container mt-4">
      <Card>
        <Image src={product.image} fluid style={{ maxWidth: '200px', maxHeight: '200px' }} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Price: ${product.price}</Card.Text>
          <AddTocart product={product}/>
        </Card.Body>
      </Card>
    </div>
    </>
  )
}
