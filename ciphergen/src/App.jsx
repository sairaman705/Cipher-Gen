import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import PasswordGenerator from "./Section1";

// Layout to include Navbar in all pages
const Layout = () => {
    return (
        <>
            <Navbar />
            <PasswordGenerator />
            <Outlet /> 
        </>
    );
};

// Define the router with a layout
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,  // Wrap routes inside Layout
        children: [
            { path: "/" },
            { path: "/about", element: <h1>About Page</h1> },
            { path: "/contact", element: <h1>Contact Page</h1> },
            { path: "/feedback", element: <h1>Feedback Page</h1> }
        ]
    }
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
