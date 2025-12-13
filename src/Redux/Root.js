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
  },
  {
    _id: "9",
    name: "سوشي سالمون",
    description: "سوشي سالمون طازج مع أرز السوشي والأفوكادو وصلصة الصويا",
    price: 160,
    category: "سوشي",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80",
    rating: 4.7,
    reviews: 120,
    ingredients: ["سالمون", "أرز سوشي", "أفوكادو", "نوري", "صويا"],
    preparationTime: "15-20 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 0
  },
  {
    _id: "10",
    name: "ستيك مشوي",
    description: "ستيك لحم مشوي على الفحم مع صوص الفلفل الأسود وبطاطا مشوية",
    price: 220,
    category: "مشويات",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&q=80",
    rating: 4.9,
    reviews: 210,
    ingredients: ["لحم بقري", "فلفل أسود", "زبدة", "بطاطا", "روزماري"],
    preparationTime: "25-30 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 5
  },
  {
    _id: "11",
    name: "فلافل",
    description: "كرات فلافل مقرمشة تقدم مع الطحينة والخبز العربي والسلطة",
    price: 40,
    category: "مأكولات عربية",
    image: "https://images.unsplash.com/photo-1604908177590-2995d4e0a3a5?w=400&h=300&fit=crop&q=80",
    rating: 4.5,
    reviews: 95,
    ingredients: ["حمص", "بقدونس", "بصل", "ثوم", "بهارات"],
    preparationTime: "15-20 دقيقة",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "12",
    name: "كوشاري",
    description: "كوشاري مصري أصيل مع صلصة الدقة والصلصة الحمراء والبصل المقلي",
    price: 35,
    category: "مأكولات عربية",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80",
    rating: 4.3,
    reviews: 80,
    ingredients: ["أرز", "عدس", "مكرونة", "حمص", "بصل"],
    preparationTime: "20-25 دقيقة",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "13",
    name: "لازانيا",
    description: "لازانيا باللحم وصوص البولونيز والجبن الموزاريلا",
    price: 130,
    category: "باستا",
    image: "https://images.unsplash.com/photo-1571091718767-8c0e0f21793e?w=400&h=300&fit=crop&q=80",
    rating: 4.6,
    reviews: 165,
    ingredients: ["مكرونة لازانيا", "لحم مفروم", "موزاريلا", "بولونيز", "بازيل"],
    preparationTime: "30-35 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 10
  },
  {
    _id: "14",
    name: "بيتزا ببيروني",
    description: "بيتزا ببيروني مع جبن موزاريلا وصوص الطماطم",
    price: 140,
    category: "بيتزا",
    image: "https://images.unsplash.com/photo-1594007654729-555d3e2da050?w=400&h=300&fit=crop&q=80",
    rating: 4.8,
    reviews: 190,
    ingredients: ["ببيروني", "موزاريلا", "طماطم", "ريحان", "زيت زيتون"],
    preparationTime: "20-25 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 0
  },
  {
    _id: "15",
    name: "برجر دبل تشيز",
    description: "برجر دبل تشيز مع صوص خاص وخس وطماطم",
    price: 95,
    category: "برجر",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop&q=80",
    rating: 4.7,
    reviews: 150,
    ingredients: ["لحم بقري", "شيدر", "خبز برجر", "خس", "طماطم"],
    preparationTime: "15-20 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 5
  },
  {
    _id: "16",
    name: "تيراميسو",
    description: "تيراميسو إيطالي كلاسيكي مع القهوة والماسكرابون",
    price: 60,
    category: "حلويات",
    image: "https://images.unsplash.com/photo-1543353071-873f17a7a5c9?w=400&h=300&fit=crop&q=80",
    rating: 4.6,
    reviews: 110,
    ingredients: ["بسكويت سافوياردي", "ماسكرابون", "قهوة", "كاكاو", "سكر"],
    preparationTime: "10-15 دقيقة",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "17",
    name: "بروستد دجاج",
    description: "دجاج بروستد مقرمش مع توابل خاصة يقدم مع البطاطا",
    price: 85,
    category: "دجاج",
    image: "https://images.unsplash.com/photo-1606756790138-2617a898f412?w=400&h=300&fit=crop&q=80",
    rating: 4.5,
    reviews: 140,
    ingredients: ["دجاج", "طحين", "توابل", "زيت", "بطاطا"],
    preparationTime: "20-25 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 0
  },
  {
    _id: "18",
    name: "شوربة طماطم",
    description: "شوربة طماطم طازجة مع ريحان وجبنة بارميزان",
    price: 35,
    category: "شوربات",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&q=80",
    rating: 4.2,
    reviews: 60,
    ingredients: ["طماطم", "ريحان", "مرق", "بارميزان", "زيت زيتون"],
    preparationTime: "10-15 دقيقة",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "19",
    name: "عصير مانجو",
    description: "عصير مانجو طبيعي منعش يقدم بارداً",
    price: 25,
    category: "مشروبات",
    image: "https://images.unsplash.com/photo-1541976079-8f6f53650a8a?w=400&h=300&fit=crop&q=80",
    rating: 4.3,
    reviews: 75,
    ingredients: ["مانجو", "ماء", "سكر", "ثلج"],
    preparationTime: "5-10 دقائق",
    isAvailable: true,
    isFeatured: false,
    discount: 0
  },
  {
    _id: "20",
    name: "كباب لحم",
    description: "كباب لحم مشوي مع سلطة وخبز عربي",
    price: 150,
    category: "مشويات",
    image: "https://images.unsplash.com/photo-1606376526689-6bdd8f06d3b5?w=400&h=300&fit=crop&q=80",
    rating: 4.7,
    reviews: 130,
    ingredients: ["لحم", "بهارات", "بصل", "ثوم", "خبز"],
    preparationTime: "20-25 دقيقة",
    isAvailable: true,
    isFeatured: true,
    discount: 10
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
