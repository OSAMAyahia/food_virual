// import { configureStore } from '@reduxjs/toolkit';
// import { foodSlices } from './Root';
 
 
// export const Store=configureStore({reducer:{
//     food: foodSlices, // استخدم نفس الاسم "food" كما هو معرف في الـ Slice

// }})

import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "./Root";
import  { CartSlise } from '../Redux/Food/CartSlice'
import { userSlise } from "./Food/Security";

export const Store=configureStore({reducer:{
    food:foodSlice,
    cart:CartSlise,
    user:userSlise,
}})