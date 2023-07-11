import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../pages/AppLayout";
import Home from "../pages/Home";
import ProductListing from "../pages/ProductListing";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Error from "../pages/Error";
import SearchResult from "../pages/SearchResult";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/products/category/:category',
                element: <ProductListing />
            },
            {
                path: '/products/:id',
                element: <ProductDetail />
            },
            {
                path: '/search/:s',
                element: <SearchResult />
            },
            {
                path: '/cart',
                element: <Cart />
            }
        ]
    }
])