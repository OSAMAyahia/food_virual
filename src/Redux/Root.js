import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Professional English food data with high-quality images
const mockFoodData = [
  {
    _id: "1",
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh tomato sauce, mozzarella cheese, and fresh basil leaves",
    price: 120,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 156,
    ingredients: ["Tomatoes", "Mozzarella", "Basil", "Olive Oil", "Yeast"],
    preparationTime: "20-25 minutes",
    isAvailable: true,
    isFeatured: true,
    discount: 0
  },
  {
    _id: "2",
    name: "Angus Beef Burger",
    description: "Premium Angus beef burger with cheddar cheese, lettuce, tomatoes, and special sauce",
    price: 85,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 89,
    ingredients: ["Angus Beef", "Cheddar", "Lettuce", "Tomatoes", "Special Sauce"],
    preparationTime: "15-20 minutes",
    isAvailable: true,
    isFeatured: true,
    discount: 10
  },
  {
    _id: "3",
    name: "Carbonara Pasta",
    description: "Traditional Italian pasta with creamy carbonara sauce, bacon, and parmesan cheese",
    price: 95,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 203,
    ingredients: ["Spaghetti", "Eggs", "Bacon", "Parmesan", "Black Pepper"],
    preparationTime: "25-30 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "4",
    name: "Chicken Shawarma",
    description: "Fresh chicken shawarma with grilled vegetables, garlic sauce, and crispy fries",
    price: 65,
    category: "Shawarma",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 134,
    ingredients: ["Chicken", "Bread", "Vegetables", "Garlic Sauce", "Potatoes"],
    preparationTime: "10-15 minutes",
    isAvailable: true,
    isFeatured: true,
    discount: 15
  },
  {
    _id: "5",
    name: "Caesar Salad",
    description: "Fresh Caesar salad with grilled chicken, romaine lettuce, parmesan, and classic dressing",
    price: 55,
    category: "Salads",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 67,
    ingredients: ["Romaine Lettuce", "Grilled Chicken", "Parmesan", "Caesar Dressing", "Croutons"],
    preparationTime: "10-12 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "6",
    name: "Grilled Fish Fillet",
    description: "Grilled fish fillet with seasonal vegetables, lemon, and fresh herbs",
    price: 150,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 45,
    ingredients: ["Fish Fillet", "Lemon", "Herbs", "Olive Oil", "Seasonal Vegetables"],
    preparationTime: "30-35 minutes",
    isAvailable: true,
    isFeatured: true,
    discount: 20
  },
  {
    _id: "7",
    name: "Chicken Kabsa",
    description: "Traditional Saudi kabsa with chicken, basmati rice, and Arabic spices",
    price: 110,
    category: "Arabic",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 98,
    ingredients: ["Chicken", "Basmati Rice", "Spices", "Yogurt", "Almonds"],
    preparationTime: "40-45 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "8",
    name: "New York Cheesecake",
    description: "Classic New York cheesecake with fresh berries and sweet sauce",
    price: 45,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 178,
    ingredients: ["Cream Cheese", "Sugar", "Eggs", "Berries", "Biscuits"],
    preparationTime: "5-8 minutes",
    isAvailable: true,
    isFeatured: true,
    discount: 5
  },
  {
    _id: "9",
    name: "Salmon Sushi",
    description: "Fresh salmon sushi with sushi rice, avocado, and soy sauce",
    price: 160,
    category: "Sushi",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 120,
    ingredients: ["Salmon", "Sushi Rice", "Avocado", "Nori", "Soy Sauce"],
    preparationTime: "15-20 minutes",
    isAvailable: true,
    isFeatured: true,
    discount: 0
  },
  {
    _id: "10",
    name: "Grilled Beef Steak",
    description: "Grilled beef steak with black pepper sauce and roasted potatoes",
    price: 220,
    category: "Grilled",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 210,
    ingredients: ["Beef", "Black Pepper", "Butter", "Potatoes", "Rosemary"],
    preparationTime: "25-30 minutes",
    isAvailable: true,
    isFeatured: true,
    discount: 0
  },
  {
    _id: "11",
    name: "Chicken Fajita",
    description: "Mexican chicken fajita with bell peppers, onions, and Mexican spices",
    price: 75,
    category: "Mexican",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 87,
    ingredients: ["Chicken", "Bell Peppers", "Onions", "Mexican Spices", "Tortilla Bread"],
    preparationTime: "20-25 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 10
  },
  {
    _id: "12",
    name: "Japanese Ramen",
    description: "Authentic Japanese ramen with noodles, meat, boiled egg, and vegetables",
    price: 90,
    category: "Japanese",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 156,
    ingredients: ["Ramen Noodles", "Meat", "Egg", "Vegetables", "Broth"],
    preparationTime: "30-35 minutes",
    isAvailable: true,
    isFeatured: true,
    discount: 0
  },
  {
    _id: "13",
    name: "Tandoori Chicken",
    description: "Indian tandoori chicken marinated in Indian spices and cooked in traditional oven",
    price: 85,
    category: "Indian",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 98,
    ingredients: ["Chicken", "Yogurt", "Tandoori Spices", "Lemon", "Garlic"],
    preparationTime: "35-40 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 15
  },
  {
    _id: "14",
    name: "Fish Tacos",
    description: "Fresh fish tacos with cabbage, spicy sauce, and lemon in corn tortilla",
    price: 70,
    category: "Mexican",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 76,
    ingredients: ["Fish Fillet", "Cabbage", "Spicy Sauce", "Lemon", "Tortilla"],
    preparationTime: "15-20 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "15",
    name: "Thai Pad Thai",
    description: "Authentic Thai pad thai with noodles, shrimp, egg, and peanuts",
    price: 95,
    category: "Thai",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 134,
    ingredients: ["Rice Noodles", "Shrimp", "Egg", "Peanuts", "Soy Sauce"],
    preparationTime: "20-25 minutes",
    isAvailable: true,
    isFeatured: true,
    discount: 10
  },
  {
    _id: "16",
    name: "Chicken Crepe",
    description: "French chicken crepe with béchamel sauce, cheese, and mixed vegetables",
    price: 65,
    category: "French",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 89,
    ingredients: ["Crepe", "Chicken", "Béchamel", "Cheese", "Vegetables"],
    preparationTime: "20-25 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "17",
    name: "Greek Moussaka",
    description: "Traditional Greek moussaka with eggplant, ground meat, and béchamel sauce",
    price: 105,
    category: "Greek",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 67,
    ingredients: ["Eggplant", "Ground Meat", "Béchamel", "Tomatoes", "Parmesan"],
    preparationTime: "45-50 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "18",
    name: "Kung Pao Chicken",
    description: "Chinese kung pao chicken with peanuts, chili peppers, and sweet sauce",
    price: 80,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 112,
    ingredients: ["Chicken", "Peanuts", "Chili Peppers", "Sweet Sauce", "Vegetables"],
    preparationTime: "25-30 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 15
  },
  {
    _id: "19",
    name: "Beef Burrito",
    description: "Large Mexican burrito with grilled beef, rice, beans, and vegetables",
    price: 75,
    category: "Mexican",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 145,
    ingredients: ["Grilled Beef", "Rice", "Beans", "Vegetables", "Large Tortilla"],
    preparationTime: "15-20 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "20",
    name: "Veggie Cheese Burger",
    description: "Healthy veggie burger with veggie patty, cheese, lettuce, and fresh tomatoes",
    price: 55,
    category: "Vegetarian",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 78,
    ingredients: ["Veggie Patty", "Cheese", "Lettuce", "Tomatoes", "Burger Bun"],
    preparationTime: "12-15 minutes",
    isAvailable: true,
    isFeatured: false,
    discount: 10
  }
];

// Backend connection disabled - using mock data instead
export const fetchFood = createAsyncThunk('food/fetchFood', async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockFoodData;
});

export const getfoodDetails = createAsyncThunk('food/getfoodDetails', async (id) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  const foodItem = mockFoodData.find(item => item._id === id);
  if (!foodItem) {
    throw new Error('Food item not found');
  }
  return foodItem;
});

const initialState = {
  foodItem: [],
  currentFood: null,
  loading: false,
  error: null,
  cartItems: [],
  favoriteItems: [], // Added favorites array
  totalPrice: 0,
  totalQuantities: 0,
  searchTerm: '', // Added search functionality
  filteredItems: [], // Added filtered items for search
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    // Cart functionality
    addToCart: (state, action) => {
      const { _id, name, price, image } = action.payload;
      const existingItem = state.cartItems.find(item => item._id === _id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ 
          _id, 
          name, 
          price, 
          image,
          quantity: 1 
        });
      }
      
      state.totalQuantities += 1;
      state.totalPrice += price;
    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find(item => item._id === itemId);
      
      if (item) {
        state.totalQuantities -= item.quantity;
        state.totalPrice -= (item.price * item.quantity);
        state.cartItems = state.cartItems.filter(item => item._id !== itemId);
      }
    },
    
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.cartItems.find(item => item._id === _id);
      
      if (item) {
        const quantityDiff = quantity - item.quantity;
        state.totalQuantities += quantityDiff;
        state.totalPrice += (item.price * quantityDiff);
        item.quantity = quantity;
      }
    },
    
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantities = 0;
      state.totalPrice = 0;
    },

    // Favorites functionality
    addToFavorites: (state, action) => {
      const item = action.payload;
      const existingFavorite = state.favoriteItems.find(fav => fav._id === item._id);
      
      if (!existingFavorite) {
        state.favoriteItems.push(item);
      }
    },
    
    removeFromFavorites: (state, action) => {
      const itemId = action.payload;
      state.favoriteItems = state.favoriteItems.filter(item => item._id !== itemId);
    },

    // Search functionality
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      // Filter items based on search term
      if (state.foodItem && state.foodItem.length > 0) {
        state.filteredItems = state.foodItem.filter(item => 
          item.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.description.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.category.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    
    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredItems = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFood.fulfilled, (state, action) => {
        state.loading = false;
        state.foodItem = action.payload;
        // Initialize filtered items with all items
        state.filteredItems = action.payload;
      })
      .addCase(fetchFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getfoodDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getfoodDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFood = action.payload;
      })
      .addCase(getfoodDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  addToFavorites, 
  removeFromFavorites, 
  setSearchTerm, 
  clearSearch 
} = foodSlice.actions;

export default foodSlice.reducer;