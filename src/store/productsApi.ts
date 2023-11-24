import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dummyjson.com/`,
  }),
  endpoints: (builder) => ({
    fetchPages: builder.query({
      query: ({ searchText, itemsPerPage, skip }) =>
        `products/search?q=${searchText}&limit=${itemsPerPage}&skip=${skip}`,
    }),
    fetchProductById: builder.query({
      query: (productId: string) => `products/${productId}`,
    }),
  }),
});

export const { useFetchPagesQuery, useFetchProductByIdQuery } = productsApi;
