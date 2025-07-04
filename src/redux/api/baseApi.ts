import type { IBook } from "@/type/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const baseApi = createApi({
    reducerPath:'baseApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://new-library-jet.vercel.app'}),
    tagTypes: ['Book','Borrow'],
    endpoints:(builder)=>({
        //books part...
        // get all books
       getAllBooks:builder.query({
        query:()=>'/api/books',
         providesTags: ['Book'],
       }),
    //    create book..
    addBook: builder.mutation({
       query:(bookData) =>({
         url:'/api/books',
         method:"POST",
         body:bookData
       }),
       invalidatesTags:['Book']
    }),
    // single book..
    getBookById:builder.query({
        query:(id)=>`/api/books/${id}`,
        providesTags: ['Book'],
    }),
    // updateBook..
    editBook:builder.mutation({
        query:({id, data})=>({
           url:`/api/books/${id}`,
           method:'PUT',
           body:data
        }),
        invalidatesTags:['Book']
    }),
    //    delete book..
    deleteBook:builder.mutation({
        query:(id)=>({
            url:`/api/books/${id}`,
            method:"DELETE"
        }),
        invalidatesTags:['Book']
    }),



    //    borrow parts...
    // create borrow..
    createBorrow:builder.mutation({
         query:(data)=>({
          url:'/api/borrow',
          method:'POST',
          body:data
         }),
         invalidatesTags:['Book', 'Borrow']
    }),

    getBorrow:builder.query({
        query:()=>'/api/borrow',
        providesTags: ['Borrow']
    })

    })
})

export const {useGetAllBooksQuery, useGetBorrowQuery,useGetBookByIdQuery, useDeleteBookMutation, useAddBookMutation, useEditBookMutation, useCreateBorrowMutation}=baseApi