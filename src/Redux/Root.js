import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// داتا mock احترافية للأطعمة
const mockFoodData = [
  {
    _id: "1",
    name: "بيتزا مارغريتا",
    description: "بيتزا كلاسيكية مع صوص الطماطم الطازج والموزريلا الإيطالية، مزينة بالريحان الطازج",
    price: 120,
    category: "بيتزا",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 156,
    ingredients: ["طماطم", "موزريلا", "ريحان", "زيت زيتون", "خميرة"],
    preparationTime: "20-25 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 0
  },
  {
    _id: "2",
    name: "برجر أنجوس",
    description: "برجر premium من لحم الأنجوس الطازج مع الجبن الشيدر، الخس، الطماطم، والصوص الخاص",
    price: 85,
    category: "برجر",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 89,
    ingredients: ["لحم أنجوس", "شيدر", "خس", "طماطم", "صوص خاص"],
    preparationTime: "15-20 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 10
  },
  {
    _id: "3",
    name: "باستا كاربونارا",
    description: "باستا إيطالية تقليدية مع صوص الكاربونارا الكريمي، البيكنج، والبارميزان",
    price: 95,
    category: "باستا",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 203,
    ingredients: ["سباغيتي", "بيض", "بيكون", "بارميزان", "فلفل أسود"],
    preparationTime: "25-30 دقيقة",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "4",
    name: "شاورما دجاج",
    description: "شاورما دجاج طازجة مع الخضار المشوية، الثومية، والبطاطا المقلية",
    price: 65,
    category: "شاورما",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 134,
    ingredients: ["دجاج", "خبز", "خضار", "ثومية", "بطاطا"],
    preparationTime: "10-15 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 15
  },
  {
    _id: "5",
    name: "سلطة سيزر",
    description: "سلطة سيزر الطازجة مع الدجاج المشوي، الخس الروماني، البارميزان، والصوص الكلاسيكي",
    price: 55,
    category: "سلطات",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 67,
    ingredients: ["خس روماني", "دجاج مشوي", "بارميزان", "صوص سيزر", "خبز محمص"],
    preparationTime: "10-12 دقيقة",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "6",
    name: "سمك مشوي",
    description: "سمك فيليه مشوي مع الخضار الموسمية، الليمون، والزعتر الطازج",
    price: 150,
    category: "مأكولات بحرية",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 45,
    ingredients: ["سمك فيليه", "ليمون", "زعتر", "زيت زيتون", "خضار موسمية"],
    preparationTime: "30-35 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 20
  },
  {
    _id: "7",
    name: "كبسة دجاج",
    description: "كبسة سعودية تقليدية مع الدجاج، الأرز البسمتي، والبهارات العربية",
    price: 110,
    category: "مأكولات عربية",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 98,
    ingredients: ["دجاج", "أرز بسمتي", "بهارات", "زبادي", "لوز"],
    preparationTime: "40-45 دقيقة",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "8",
    name: "تشيز كيك",
    description: "تشيز كيك نيويوركي الكلاسيكي مع التوت الطازج والصلصة الحلوة",
    price: 45,
    category: "حلويات",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 178,
    ingredients: ["جبن كريمي", "سكر", "بيض", "توت", "بسكويت"],
    preparationTime: "5-8 دقائق",
    isAvailable: true,
    isFeatured: true,
    discount: 5
  }
];

// محاكاة جلب جميع الأطعمة
export const fetchFood = createAsyncThunk('food/getallfood', async () => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockFoodData;
});

// محاكاة جلب تفاصيل طعام معين
export const getfoodDetails = createAsyncThunk('food/getfoodDetails', async (id) => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const food = mockFoodData.find(item => item._id === id);
  if (!food) {
    throw new Error("الطعام غير موجود");
  }
  return food;
});

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    foodItem: [],
    loading: false,
    error: null,
    currentFood: null
  },
  reducers: {
    clearCurrentFood: (state) => {
      state.currentFood = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFood.fulfilled, (state, action) => {
        state.foodItem = action.payload;
        state.loading = false;
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
        state.currentFood = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getfoodDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearCurrentFood } = foodSlice.actions;
export const foodSlices = foodSlice.reducer;