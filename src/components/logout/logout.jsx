import { Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { logout } from '../../Services/auth.service';

export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(navigate);
    }
  return (
    <Button onClick={handleLogout} as={Link} to="/login" variant="outline-primary">Logout</Button> 
  )
}
