import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
  RenderPDF,
} from "./pages/pages";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
`;

function Loading() {
  return (
    <Backdrop>
      <div className="d-flex justify-content-center">
        <output className="spinner-border">
          <span className="visually-hidden">Loading...</span>
        </output>
      </div>
    </Backdrop>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
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
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "tailors",
        element: (
          <Suspense fallback={<Loading />}>
            <Tailor />
          </Suspense>
        ),
      },
      {
        path: "tailors/new",
        element: (
          <Suspense fallback={<Loading />}>
            <TailorForm />
          </Suspense>
        ),
      },
      {
        path: "tailors/:tailorId",
        element: (
          <Suspense fallback={<Loading />}>
            <TailorForm />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<Loading />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: "products/new",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductForm />
          </Suspense>
        ),
      },
      {
        path: "products/:productId",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductForm />
          </Suspense>
        ),
      },
      {
        path: "transfer/:type",
        element: (
          <Suspense fallback={<Loading />}>
            <Transfer />
          </Suspense>
        ),
      },
      {
        path: "inventory-stock",
        element: (
          <Suspense fallback={<Loading />}>
            <InventoryStock />
          </Suspense>
        ),
      },
      {
        path: "stock-card",
        element: (
          <Suspense fallback={<Loading />}>
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
  {
    path: "/pdf/:qty/:qrCode/:productCode",
    element: (
      <Suspense fallback={<Loading />}>
        <RenderPDF />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
