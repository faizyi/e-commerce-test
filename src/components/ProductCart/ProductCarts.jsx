import React, { useEffect, useState } from 'react'
import { getProducts } from '../../Services/product.service';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { showLoader,hideLoader } from '../../redux/loaderSlice/LoaderSlice';
import { Loader } from '../loader/Loader';
export default function ProductCarts() {
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state)=>state.loader)
    const [products, setProducts] = useState(null);
    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                dispatch(showLoader());
                const result = await getProducts(dispatch);
                setProducts(result);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                dispatch(hideLoader());
            }
        };
        
        fetchProducts();
    },[])
    if (!products) return <div><Loader/></div>;
  return (
    <div className="bg-white">
             <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product, i) => (
                    <div key={i} className="group relative overflow-hidden border rounded-md border-gray-200 hover:shadow-lg">
                        <Link to={`/product/${product.id}`}>
                            <div className="aspect-w-1 aspect-h-1 bg-gray-200 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.imageAlt}
                                    className="w-90 h-full transition duration-300 transform group-hover:scale-110"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                    {product.productName}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {product.description.slice(0, 50)}....
                                </p>
                                <p className="mt-2 font-bold text-gray-900">$ {product.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        </div>
  )
}
