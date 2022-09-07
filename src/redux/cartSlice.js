import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getCartAsync = createAsyncThunk(
  "cart/getCartAsync",
  async (payload) => {
    const resp = await fetch("/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.jwt}`,
      },
    });
    if (resp.ok) {
      const cartLines = (await resp.json()).cartLines;
      return { cartLines };
    }
  }
);

export const addCartAsync = createAsyncThunk(
  "cart/addCartAsync",
  async (payload) => {
    const resp = await fetch("/cart/addCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.jwt}`,
      },
      body: JSON.stringify({
        productId: payload.productId,
        amount: payload.amount,
      }),
    });

    if (resp.ok) {
      const cartLine = await resp.json();
      return { cartLine };
    }
  }
);

export const buyCartAsync = createAsyncThunk(
  "cart/buyCartAsync",
  async (payload) => {
    const resp = await fetch("/order/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.jwt}`,
      },
      body: JSON.stringify( payload.order ),
    });

    if (resp.ok) {
	  alert('Đặt hàng thành công')
	  window.location.reload()

    }else{
		alert('Đặt hàng thất bại')
		
	}

  }
);

export const deleteCartAsync = createAsyncThunk(
  "cart/deleteCartAsync",
  async (payload) => {
    const resp = await fetch(`/cart/deleteCartItem/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.jwt}`,
      },
    });

    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const cartSlice = createSlice({
  name: "cartLines",
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      const cartLine = {
        id: action.payload.id,
        product: action.payload.product,
        amount: action.payload.amount,
      };

      state.push(cartLine);
    },
    deleteCart: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getCartAsync.fulfilled]: (state, action) => {
      return action.payload.cartLines;
    },
    [addCartAsync.fulfilled]: (state, action) => {
      state.push(action.payload.cartLine);
    },
    [deleteCartAsync.fulfilled]: (state, action) => {
      return state.filter((cartLine) => cartLine.id !== action.payload.id);
    },
  },
});

export const { addCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;
