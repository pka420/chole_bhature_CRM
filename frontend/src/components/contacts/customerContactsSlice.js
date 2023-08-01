import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

window.googleDocCallback = function () { return true; };

export const customerContactSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://script.google.com/macros/s/AKfycbzmXPDoH4yqPlr5Hq-2urkAZSrrvtgqGOd-zkm22rQvYm0VedMsNk2DGRXH9wC-DvRr/exec?callback=googleDocCallback' }),
    tagTypes: ['customerContacts'],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => '/customerContacts',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['customerContacts']
        }),
        addContact: builder.mutation({
            query: (customerContact) => ({
                url: '/customerContacts',
                method: 'POST',
                body: customerContact
            }),
            invalidatesTags: ['Contacts']
        }),
        updateContact: builder.mutation({
            query: (customerContact) => ({
                url: `/customerContacts/${customerContact.id}`,
                method: 'PATCH',
                body: customerContact
            }),
            invalidatesTags: ['Contacts']
        }),
        deleteContact: builder.mutation({
            query: ({ customerContact }) => ({
                url: `/customerContacts/${customerContact.id}`,
                method: 'DELETE',
                body: customerContact
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
} = customerContactSlice
