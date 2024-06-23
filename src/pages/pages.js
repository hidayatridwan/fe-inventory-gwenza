import { lazy } from "react";

export const Auth = lazy(() => import("./Auth"));
export const Dashboard = lazy(() => import("./Dashboard"));
export const Tailor = lazy(() => import("./Tailor"));
export const Product = lazy(() => import("./Product"));
export const Transfer = lazy(() => import("./Transfer"));
export const StockCard = lazy(() => import("./StockCard"));
export const InventoryStock = lazy(() => import("./InventoryStock"));
export const TailorForm = lazy(() => import("./TailorForm"));
export const ProductForm = lazy(() => import("./ProductForm"));
export const RenderPDF = lazy(() => import("./RenderPDF"));
export const Model = lazy(() => import("./Model"));
export const ModelForm = lazy(() => import("./ModelForm"));
