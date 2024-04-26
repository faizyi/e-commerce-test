import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuthentication } from '../../Services/useAuthentication';
import Swal from 'sweetalert2'
import { addToCartService } from '../../Services/addToCartService';
import { useNavigate } from 'react-router-dom';
export default function IncreaseItem({product,}) {
    const navigate = useNavigate();
    const { isAuthenticated, uid } = useAuthentication();
    const increase = () => {
        if(isAuthenticated){
            console.log("Item added to cart");
            addToCartService(product,uid);
    }else{
        Swal.fire("Please login to add item to cart");
        navigate("/login");
    }
}
  return (
    <Button onClick={increase} variant="primary" className="px-3 ms-2">
    <FontAwesomeIcon icon={faPlus} />
  </Button>
  )
}
