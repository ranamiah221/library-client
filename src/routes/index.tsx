import Main from "@/layout/Main";
import Books from "@/pages/Books";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:'books',
                element:<Books></Books>
            }
        ]
    }
])

export default routes;