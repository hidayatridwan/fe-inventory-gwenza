import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { checkAlreadyAuth, checkNotAuth, queryClient } from "./api/auth";
import { action as logoutAction } from "./api/logout";
import RootLayout from "./pages/RootLayout";
import {
  Auth,
  Dashboard,
  InventoryStock,
  Product,
  ProductForm,
  StockCard,
  Tailor,
  TailorForm,
  Transfer,
} from "./pages/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback="Loading...">
        <Auth />
      </Suspense>
    ),
    loader: checkAlreadyAuth,
  },
  {
    element: <RootLayout />,
    loader: checkNotAuth,
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback="Loading...">
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "tailors",
        element: (
          <Suspense fallback="Loading...">
            <Tailor />
          </Suspense>
        ),
      },
      {
        path: "tailors/new",
        element: (
          <Suspense fallback="Loading...">
            <TailorForm />
          </Suspense>
        ),
      },
      {
        path: "tailors/:tailorId",
        element: (
          <Suspense fallback="Loading...">
            <TailorForm />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback="Loading...">
            <Product />
          </Suspense>
        ),
      },
      {
        path: "products/new",
        element: (
          <Suspense fallback="Loading...">
            <ProductForm />
          </Suspense>
        ),
      },
      {
        path: "products/:productId",
        element: (
          <Suspense fallback="Loading...">
            <ProductForm />
          </Suspense>
        ),
      },
      {
        path: "transfer/:type",
        element: (
          <Suspense fallback="Loading...">
            <Transfer />
          </Suspense>
        ),
      },
      {
        path: "inventory-stock",
        element: (
          <Suspense fallback="Loading...">
            <InventoryStock />
          </Suspense>
        ),
      },
      {
        path: "stock-card",
        element: (
          <Suspense fallback="Loading...">
            <StockCard />
          </Suspense>
        ),
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
