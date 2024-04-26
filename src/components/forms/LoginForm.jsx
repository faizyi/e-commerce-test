import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import { login } from '../../Services/auth.service';
import { useDispatch,useSelector} from "react-redux";
import { showLoader } from '../../redux/loaderSlice/LoaderSlice';
import { Loader } from '../loader/Loader';
export default function LoginForm() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loader);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = (data) => {
            if (data && data.password) {
            dispatch(showLoader());
            login(data, reset, navigate, dispatch);
        } else {
            console.error("Invalid data format");
        }
  };
  return (
    <div className="flex justify-center items-center h-screen">
    {isLoading ? (<Loader/>) : (
      <Form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email", { required: "Email is required" })} />
          {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
        </Form.Group>
  
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
          {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p className="mt-2 text-center">
          Not a member? <Link to="/signup">Signup</Link>
        </p>
      </Form>
    )}
    </div>
  )
}
