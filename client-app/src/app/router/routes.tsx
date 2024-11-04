import { RouteObject, createBrowserRouter } from "react-router-dom";
import ProductDetails from "../../features/products/details/ProductDetails";
import App from "../layout/App";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import ProductCreate from "../../features/products/dashboard/productCreate";
import LoginForm from "../../features/auth/loginForm";
import RegisterForm from "../../features/auth/registerForm";
export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "product/:id", element: <ProductDetails />, },
            { path: "", element: <ProductDashboard />, },
            { path: "product/Modify/:id?", element: <ProductCreate /> },
            { path: "login", element: <LoginForm /> },
            { path: "register", element: <RegisterForm /> }
        ],
    },
];
export const router = createBrowserRouter(routes);
