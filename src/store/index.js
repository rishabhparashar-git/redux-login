import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";

const store  = configureStore({
        reducer:{
                authReducer: authSlice.reducer
        }
})

export default store