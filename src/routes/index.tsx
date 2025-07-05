import Main from "@/layout/Main";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowSummary from "@/pages/BorrowSummary";
import ErrorPages from "@/pages/ErrorPages";

import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<ErrorPages></ErrorPages>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:'books',
                element:<Books></Books>
            },
            {
                path:'/:id',
                element:<BookDetails></BookDetails>
            },

             
            {
                path:'borrow-summary',
                element:<BorrowSummary></BorrowSummary>
            }
        ]
    }
])

export default routes;