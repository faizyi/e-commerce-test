import { child, get, getDatabase, ref } from "firebase/database"
import Swal from 'sweetalert2'
export const typecheck = async (uid, navigate, reset) => {
    const dbRef = ref(getDatabase());
    const adminSnapshot = await get(child(dbRef, `admin/${uid}`));
    const usersSnapshot = await get(child(dbRef, `users/${uid}`));
    if (adminSnapshot.exists()) {
        Swal.fire("Login Successful");
        // dispatch(hideLoader());
        // navigate('/')
        navigate("/", { state: { adminData: adminSnapshot.val() } });
      } else if (usersSnapshot.exists()) {
        const userData = usersSnapshot.val();
        console.log(userData);
        Swal.fire("Login Successful");
        // dispatch(hideLoader());
        // navigate('/')
        navigate("/", { state: { userData: usersSnapshot.val() } });
      } else {
        // dispatch(hideLoader());
        Swal.fire("User data not found");
        reset();
      }
};