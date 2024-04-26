import { addproduct } from "../../Services/product.service";
import { storage } from "../firebaseConfig/FirebaseConfig";
import { ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { showLoader,hideLoader } from "../../redux/loaderSlice/LoaderSlice";
export const getImageUrl = (data, reset,id, dispatch) => {
   dispatch(showLoader());
    const productfile = data.image[0];
    const StorageRef = sRef(storage, `ProductsImages/${productfile.name}`);
    const uploadTask = uploadBytesResumable(StorageRef, productfile);
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      console.log(error);
      dispatch(hideLoader());
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        addproduct({...data, image: downloadURL},reset,id,dispatch);
        console.log(downloadURL);
        dispatch(hideLoader());
      }).catch((error) => {
        console.log(error);
        dispatch(hideLoader());
      })
    })
}