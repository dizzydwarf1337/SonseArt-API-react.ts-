import { RouteObject, createBrowserRouter } from "react-router-dom";
import ProductDetails from "../../features/products/details/ProductDetails";
import App from "../layout/App";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import ProductCreate from "../../features/products/dashboard/productCreate";
export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "product/:id", element: <ProductDetails />, },
            { path: "", element: <ProductDashboard />, },
            { path: "product/Modify/:id?", element:<ProductCreate/>},
        ],
    },
];
export const router = createBrowserRouter(routes);
