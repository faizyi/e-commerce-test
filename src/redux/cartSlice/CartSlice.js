import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    cartItems: [],
    amount: 0,
    totalPrice: 0,
    totalQuantity: 0,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCartRedux: (state, action) => {
            state.totalQuantity = state.totalQuantity + 1;
            // const findId = state.cartItems.findIndex((item)=>item.itemId === action.payload.itemId);
            // if(findId >= 0){
            //  state.cartItems[findId].quantity += 1
            // }
            // else{  
            //  state.cartItems.push(action.payload)
            // }
        } ,
    }
})
export default cartSlice.reducer
export const {addToCartRedux,} = cartSlice.actions