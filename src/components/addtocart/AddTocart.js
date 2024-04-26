import { Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../Services/useAuthentication';
import Swal from 'sweetalert2'
import { addToCartService } from '../../Services/addToCartService';
export default function AddTocart({product}) {
    // const {cartItems} = useSelector(state=>state.cart)
    // console.log(cartItems);
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, uid } = useAuthentication();
    const addToCart = () => {
        if(isAuthenticated){
            // dispatch(addToCartRedux(product));
            console.log("Item added to cart");
            addToCartService(product,uid);
    }else{
        Swal.fire("Please login to add item to cart");
        navigate("/login");
    }
}
  return (
    <Button onClick={addToCart} variant="primary">Add to Cart</Button>
  )
}
