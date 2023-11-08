import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { AdminRouter } from "./Admin/AdminRoutes.jsx";
import { UserRouter } from "./User/Route.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <AdminRouter/>
        <UserRouter/>
    </>
  )
);
