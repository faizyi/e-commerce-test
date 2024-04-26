import { child, get, push, ref, set } from "firebase/database"
import { db } from "../firebase/firebaseConfig/FirebaseConfig"
import Swal from 'sweetalert2'
import { showLoader, hideLoader } from "../redux/loaderSlice/LoaderSlice";
export const addproduct = async (productData, reset,id, dispatch) => {
    try {
        dispatch(showLoader());
        const newProductKey = push(child(ref(db), 'posts')).key;
        await set(ref(db, "products" + "/" + newProductKey), {
            ...productData,
            itemId : id,
            id: newProductKey,
            createdAt: new Date().toLocaleDateString(),
            quantity : 1,
        })
        Swal.fire("Product added successfully");
        reset();
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(hideLoader());
    }
}

export const getProducts = async (dispatch) => {
    try {
        dispatch(showLoader()); 
        const snapshot = await get(child(ref(db), 'products'));
        if(snapshot.exists()){
            
            return Object.values(snapshot.val());
        }
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(hideLoader());
    }
}

export const getProductsById = async (id, dispatch ) => {
    try {
        dispatch(showLoader());
        const snapshot = await get(child(ref(db), `products/${id}`));
        if(snapshot.exists()){
            return snapshot.val();
            // return Object.values(snapshot.val());
        }
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(hideLoader());
    }
}