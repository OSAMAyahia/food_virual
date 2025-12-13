import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// داتا mock لعربة التسوق
let mockCartData = [
  {
    _id: "cart1",
    userId: "1",
    items: [
      {
        foodId: "1",
        name: "بيتزا مارغريتا",
        price: 120,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop",
        totalPrice: 240
      },
      {
        foodId: "2",
        name: "برجر أنجوس",
        price: 85,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop",
        totalPrice: 85
      }
    ],
    totalAmount: 325,
    status: "active",
    createdAt: "2024-12-01T10:00:00.000Z"
  }
];

// داتا mock لطلبات المستخدم
let mockOrdersData = [
  {
    _id: "order1",
    userId: "1",
    items: [
      {
        foodId: "3",
        name: "باستا كاربونارا",
        price: 95,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=150&h=150&fit=crop"
      }
    ],
    totalAmount: 95,
    status: "مكتمل",
    orderDate: "2024-12-10T15:30:00.000Z",
    deliveryAddress: "القاهرة، مصر",
    paymentMethod: "كاش"
  },
  {
    _id: "order2",
    userId: "1",
    items: [
      {
        foodId: "4",
        name: "شاورما دجاج",
        price: 65,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=150&h=150&fit=crop"
      }
    ],
    totalAmount: 130,
    status: "قيد التحضير",
    orderDate: "2024-12-11T12:15:00.000Z",
    deliveryAddress: "القاهرة، مصر",
    paymentMethod: "بطاقة ائتمان"
  }
];

// محاكاة إنشاء عربة تسوق
export const CreateCart = createAsyncThunk('cart/create', async (body) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newCart = {
    _id: "cart" + Date.now(),
    userId: body.userId || "1",
    items: body.items || [],
    totalAmount: body.totalAmount || 0,
    status: "active",
    createdAt: new Date().toISOString()
  };
  
  mockCartData.push(newCart);
  return newCart;
});

// محاكاة الحصول على عربة التسوق
export const GetCart = createAsyncThunk('cart/get', async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // إرجاع أول عربة تسوق (يمكن تعديلها حسب المستخدم)
  const userCart = mockCartData.find(cart => cart.status === "active") || mockCartData[0];
  return userCart || {
    _id: "empty_cart",
    userId: "1",
    items: [],
    totalAmount: 0,
    status: "active",
    createdAt: new Date().toISOString()
  };
});

// محاكاة إضافة عنصر إلى العربة
export const AddToCart = createAsyncThunk('cart/addItem', async ({ foodId, quantity = 1 }) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // داتا mock للطعام (يمكن استيرادها من ملف آخر)
  const mockFood = [
    { _id: "1", name: "بيتزا مارغريتا", price: 120, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop" },
    { _id: "2", name: "برجر أنجوس", price: 85, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop" },
    { _id: "3", name: "باستا كاربونارا", price: 95, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=150&h=150&fit=crop" }
  ];
  
  const food = mockFood.find(f => f._id === foodId);
  if (!food) throw new Error("الطعام غير موجود");
  
  const existingCart = mockCartData.find(cart => cart.status === "active");
  if (existingCart) {
    const existingItem = existingCart.items.find(item => item.foodId === foodId);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
      existingCart.items.push({
        foodId: foodId,
        name: food.name,
        price: food.price,
        quantity: quantity,
        image: food.image,
        totalPrice: food.price * quantity
      });
    }
    existingCart.totalAmount = existingCart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    return existingCart;
  }
  
  return mockCartData[0];
});

// محاكاة الحصول على طلبات المستخدم
export const GetOrders = createAsyncThunk('orders/get', async () => {
  await new Promise(resolve => setTimeout(resolve, 700));
  return mockOrdersData;
});

const CartSlises = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    orders: [],
    loading: false,
    err: null
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateCart.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(CreateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.err = null;
      })
      .addCase(CreateCart.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
      })
      .addCase(GetCart.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(GetCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.err = null;
      })
      .addCase(GetCart.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
      })
      .addCase(AddToCart.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.err = null;
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
      })
      .addCase(GetOrders.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(GetOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.err = null;
      })
      .addCase(GetOrders.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
      });
  }
});

export const { clearCart } = CartSlises.actions;
export const CartSlise = CartSlises.reducer;