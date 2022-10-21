import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `http://localhost:8000/getImage`

export const imageApi = createApi({
    reducerPath: "imageApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getImage: builder.query({
            query: (fileName) => {
                const { input } = fileName;
                return {
                    url: `${baseUrl}`,
                    params: { input }
                }
            }
        })
    })
});

export const {
    useGetImageQuery,
} = imageApi;