import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { Home } from "./pages/home";
import { ListMovie } from "./pages/list-movies";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children : [
            {
                index:true,
                element : <Home/>
            },
            {
                path: '/movies',
                element : <ListMovie/>
            }
        ]
       
    } 
])