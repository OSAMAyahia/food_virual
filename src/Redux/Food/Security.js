import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// داتا mock احترافية للمستخدمين
const mockUsers = [
  {
    id: 1,
    name: "أسامة محمد",
    email: "osama@gmail.com",
    password: "123456",
    phone: "+201234567890",
    address: "القاهرة، مصر",
    jobTitle: "مدير مطعم",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "admin",
    createdAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    name: "أحمد علي",
    email: "ahmed@gmail.com",
    password: "123456",
    phone: "+201234567891",
    address: "الإسكندرية، مصر",
    jobTitle: "عميل مميز",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "user",
    createdAt: "2024-01-15T00:00:00.000Z"
  }
];

// محاكاة تسجيل المستخدم
export const Createuser = createAsyncThunk('user/create', async (body) => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newUser = {
    id: mockUsers.length + 1,
    name: body.name,
    email: body.email,
    password: body.password,
    phone: body.phone || "+201234567892",
    address: body.address || "القاهرة، مصر",
    jobTitle: "عميل جديد",
    profileImage: "https://images.unsplash.com/photo-1527980961421-326612c8115a?w=150&h=150&fit=crop&crop=face",
    role: "user",
    createdAt: new Date().toISOString()
  };
  
  mockUsers.push(newUser);
  return newUser;
});

// محاكاة تسجيل الدخول
export const login = createAsyncThunk('user/login', async (body) => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = mockUsers.find(u => u.email === body.email && u.password === body.password);
  
  if (!user) {
    throw new Error("بيانات تسجيل الدخول غير صحيحة");
  }
  
  // تخزين بيانات المستخدم في localStorage
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', 'mock-jwt-token-' + user.id);
  
  return {
    user: user,
    token: 'mock-jwt-token-' + user.id,
    message: "تم تسجيل الدخول بنجاح"
  };
});

const userSlises = createSlice({
  name: 'user',
  initialState: {
    userItems: [],
    loading: false,
    err: null,
    currentUser: null,
    isAuthenticated: false
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    checkAuth: (state) => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (user && token) {
        state.currentUser = JSON.parse(user);
        state.isAuthenticated = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Createuser.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(Createuser.fulfilled, (state, action) => {
        state.loading = false;
        state.userItems = action.payload;
        state.err = null;
      })
      .addCase(Createuser.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        state.err = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
      });
  }
});

export const { logout, checkAuth } = userSlises.actions;
export const userSlise = userSlises.reducer;