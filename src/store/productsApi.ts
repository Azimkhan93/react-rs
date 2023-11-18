import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dummyjson.com/`,
  }),
  endpoints: (builder) => ({
    fetchPages: builder.query({
      query: ({ searchText, limit, skip }) =>
        `products/search?q=${searchText}&limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const { useFetchPagesQuery } = productsApi;
