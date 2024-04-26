import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link,useNavigate} from 'react-router-dom';
import { signup } from '../../Services/auth.service';
import { useDispatch,useSelector } from "react-redux";
import { showLoader } from '../../redux/loaderSlice/LoaderSlice';
import { Loader } from '../loader/Loader';
export default function SignupForm() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset,formState: { errors } } = useForm();
    const isLoading = useSelector(state=>state.loader.isLoading)
    const onSubmit = (data) => {
      try {
        dispatch(showLoader());
        signup(data, reset,navigate,dispatch);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
    {isLoading ? <Loader/> :
    <div className="flex justify-center items-center h-screen">
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>

      <Form.Group controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Full Name" {...register("name", { required: "Name is required" })} />
        {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
      </Form.Group>

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
      Already a member? <Link to="/login">Login</Link>
      </p>

    </Form>

  </div>}
  </>
  )
}
