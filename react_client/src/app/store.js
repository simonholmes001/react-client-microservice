import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { imageApi } from "../services/imageAPI";

export default configureStore({
    reducer: {
        [imageApi.reducerPath]: imageApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imageApi.middleware)
});

// setupListeners(store.dispatch);