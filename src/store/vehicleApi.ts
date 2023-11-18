import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://swapi.dev/api/`,
  }),
  endpoints: (builder) => ({
    fetchPages: builder.query({
      query: ({ apiPage, searchText }) =>
        `?page=${apiPage}&search=${searchText}`,
    }),
  }),
});

export const { useFetchPagesQuery } = vehiclesApi;
