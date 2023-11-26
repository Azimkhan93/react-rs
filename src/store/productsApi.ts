import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dummyjson.com/`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

export const {
  useFetchPagesQuery,
  useFetchProductByIdQuery,
  util: { getRunningQueriesThunk },
} = productsApi;
export const { fetchPages, fetchProductById } = productsApi.endpoints;
