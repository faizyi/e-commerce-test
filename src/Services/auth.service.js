import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth,db } from "../firebase/firebaseConfig/FirebaseConfig";
import Swal from 'sweetalert2'
import { ref, set } from "firebase/database";
import { typecheck } from "./auth.typecheck";
import { showLoader, hideLoader } from "../redux/loaderSlice/LoaderSlice";
export const signup = (data,reset,navigate,dispatch) => {
    try {
        dispatch(showLoader());
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async(userCredential) => {
            const user = userCredential.user;
            await set(ref(db,`users/${user.uid}`),{
                ...data
            })
            Swal.fire("signup successful");
            navigate("/login");
        }).catch((error) => {
            console.log(error);
            Swal.fire("signup failed");
            reset();
        }).finally(() => {
            dispatch(hideLoader());
        })
    } 
    catch (error) {
        console.log(error);
    }
}

export const login = (data,reset,navigate,dispatch) => {
    try {
        dispatch(showLoader());
       signInWithEmailAndPassword(auth, data.email, data.password)
       .then((userCredential) => {
           const user = userCredential.user;
           typecheck(user.uid,navigate,reset);
       }).catch((error) => {
           console.log(error);
           Swal.fire("login failed");
           reset();
       }).finally(() => {
           dispatch(hideLoader());
       })
    } catch (error) {
        console.log(error);
    }
}

export const logout = (navigate) => {
    try {
        signOut(auth).then(() => {
            Swal.fire("Logout Successful");
            navigate("/");
        }).catch((error) => {
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}

export const onAuthState = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve({ isAuthenticated: true, uid: user.uid });
            } else {
                resolve({ isAuthenticated: false });
            }
        });
    });
}