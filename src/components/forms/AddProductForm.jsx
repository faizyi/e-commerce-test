import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { getImageUrl } from '../../firebase/storage/storage';
import Header from '../header/Header';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { showLoader,} from '../../redux/loaderSlice/LoaderSlice';
import { Loader } from '../loader/Loader';
export default function AddProductForm() {
  const { isLoading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [id, setId] = useState(1);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
      setId(prev=>prev + 1);
      try {
        dispatch(showLoader());
        getImageUrl(data, reset,id, dispatch);
      } catch (error) {
        console.log(error);
      }
    };
  
  return (
    <>
    <Header/>
    {isLoading ? (
      (<Loader/>)
    ) : (
      <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" id="productName" {...register("productName", { required: "Product Name is required" })} 
          className="mt-1 p-2 w-full border rounded-md" />
          {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" id="price" {...register("price", { required: "Price is required", min: 
          { value: 0, message: "Price must be a positive number" } })} className="mt-1 p-2 w-full border rounded-md" />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea rows="3" id="description" {...register("description", { required: "Description is required" })}
           className="mt-1 p-2 w-full border rounded-md"></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" id="image" accept="image/jpeg,image/png" 
          {...register("image", { required: "Image is required" })} 
          className="mt-1 w-full" />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50">
            Add Product
          {/* {submitting ? "Adding..." : "Add Product"} */}
        </button>
      </form>
    </div>
    )}
  </>
  )
}
