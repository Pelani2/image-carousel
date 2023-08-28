import React from "react";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <RouterProvider router={AppRoutes} />
  );
}