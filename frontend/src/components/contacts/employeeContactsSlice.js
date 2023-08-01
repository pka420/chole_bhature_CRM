import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

window.googleDocCallback = function () { return true; };

export const employeeContactSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://script.google.com/macros/s/AKfycbw8erd9v7KMZPuoEEOxhHQLzkwxa3v0HqGL8gQcbjj5AyrvKb06ZRbNDMetJdkQQDVy/exec?callback=googleDocCallback' }),
    tagTypes: ['employeeContacts'],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => '/employeeContacts',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['employeeContacts']
        }),
        addContact: builder.mutation({
            query: (employeeContact) => ({
                url: '/employeeContacts',
                method: 'POST',
                body: employeeContact
            }),
            invalidatesTags: ['Contacts']
        }),
        updateContact: builder.mutation({
            query: (employeeContact) => ({
                url: `/employeeContacts/${employeeContact.id}`,
                method: 'PATCH',
                body: employeeContact
            }),
            invalidatesTags: ['Contacts']
        }),
        deleteContact: builder.mutation({
            query: ({ employeeContact }) => ({
                url: `/employeeContacts/${employeeContact.id}`,
                method: 'DELETE',
                body: employeeContact
            }),
            invalidatesTags: ['Contacts']
        }),
    })
})

export const {
    useGetContactsQuery,
    useAddContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation
} = employeeContactSlice
