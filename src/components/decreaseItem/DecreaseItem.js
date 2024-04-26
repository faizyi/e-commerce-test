import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus,} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useAuthentication } from '../../Services/useAuthentication';
import { decreaseCartItemQuantity } from '../../Services/addToCartService';
export default function DecreaseItem(props) {
    const {itemKey} = props.product;
    const navigate = useNavigate();
    const { isAuthenticated, uid } = useAuthentication();
    const decrease = () => {
        if(isAuthenticated){
            console.log("Item added to cart");
            decreaseCartItemQuantity(itemKey ,uid);
    }else{
        Swal.fire("Please login to add item to cart");
        navigate("/login");
    }
}
  return (
    <Button onClick={decrease} variant="primary" className="px-3 me-2">
    <FontAwesomeIcon icon={faMinus} />
  </Button>
  )
}
