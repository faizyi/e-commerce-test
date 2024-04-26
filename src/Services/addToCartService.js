import { child, get, push, ref, remove, set } from "firebase/database"
import { db } from "../firebase/firebaseConfig/FirebaseConfig"
export const addToCartService = async (item,uid) => {
    try {
        const cartRef = ref(db, `cartItems ${uid}`);
        const cartSnapshot = await get(cartRef);
        const cartItems = cartSnapshot.val() || {};

        const existingItemKey = Object.keys(cartItems).find(
            (key) => cartItems[key].itemId === item.itemId
        );

        if (existingItemKey) {
            const updatedQuantity = cartItems[existingItemKey].quantity + item.quantity;
            await set(ref(db, `cartItems ${uid}/${existingItemKey}`), {
                ...cartItems[existingItemKey],
                quantity: updatedQuantity,
                totalPrice: cartItems[existingItemKey].totalPrice + (item.price * item.quantity),
            });
        } else {
            const newProductKey = push(cartRef).key;
            await set(ref(db, `cartItems ${uid}/${newProductKey}`), {
                itemId: item.itemId,
                name: item.productName,
                price: item.price,
                totalPrice: item.price * item.quantity,
                quantity: item.quantity,
                image: item.image,
                itemKey : newProductKey,
            });
        }
        // const totalQuantity = await getItemTotalQuantity(uid);
        console.log("Product added to cart successfully");
    } catch (error) {
        console.log(error);
    }
}

export const decreaseCartItemQuantity = async (itemKey, uid) => {
    try {
        const cartItemRef = ref(db, `cartItems ${uid}/${itemKey}`);
        const cartItemSnapshot = await get(cartItemRef);
        if (cartItemSnapshot.exists()) {
            const currentQuantity = cartItemSnapshot.val().quantity;
            if (currentQuantity > 1) { // Ensure quantity does not go below 1
                await set(cartItemRef, { // Update the quantity in Firebase
                    ...cartItemSnapshot.val(),
                    quantity: currentQuantity - 1,
                    totalPrice: cartItemSnapshot.val().price * (currentQuantity - 1),
                });
            }
        }
        console.log("Item quantity decreased successfully");
    } catch (error) {
        console.log(error);
    }
}

export const removeCartItem = async (itemKey, uid) => {
    try {
        const cartItemRef = ref(db, `cartItems ${uid}/${itemKey}`);
        await remove(cartItemRef);
        console.log("Item removed from cart successfully");
    } catch (error) {
        console.log(error);
    }
}

export const getCartItems = async (uid) => {
    try {
        const snapshot = await get(child(ref(db),  `cartItems ${uid}`));
        if(snapshot.exists()){
            
            return Object.values(snapshot.val());
        }
    } catch (error) {
        console.log(error);
    }}