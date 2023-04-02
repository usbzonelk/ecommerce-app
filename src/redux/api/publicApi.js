import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://apik.app/app/api/',
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: builder => ({}),
});