import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export default configureStore({
	reducer: {
		cartLines: cartReducer,
	},
});
