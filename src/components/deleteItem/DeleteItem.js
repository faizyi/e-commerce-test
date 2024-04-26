import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { removeCartItem } from '../../Services/addToCartService';
import Swal from 'sweetalert2'
import { useAuthentication } from '../../Services/useAuthentication';
export default function DeleteItem(props) {
    const {itemKey} = props.product;
    const navigate = useState();
    const { isAuthenticated, uid } = useAuthentication();
    const removeItem = () => {
        if(isAuthenticated){
            console.log("Item added to cart");
            removeCartItem(itemKey ,uid);
    }else{
        Swal.fire("Please login to add item to cart");
        navigate("/login");
    }
}
    return (
        <Button onClick={removeItem} variant="primary" className="btn-sm me-1 mb-2" title="Remove item">
            <FontAwesomeIcon icon={faTrash} />
        </Button>
    )
}
