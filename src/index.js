import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "./comp/icon.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Patient from "./pages/patient/Patient";
import SignIn from "./pages/sign-in/SignIn";
import AddDoctor from "./pages/add-doctor/AddDoctor";
import AddAccount from "./pages/add-account/AddAccount";
import ChooseNow from "./pages/select-doctors/choose-now/ChooseNow";
import EditData from "./pages/select-doctors/edit-data/EditData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Book/:id",
    element: <Patient />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/ShowDoctors",
    element: <ChooseNow />,
  },
  {
    path: "/ShowDoctors/:specializationRoute/:id",
    element: <EditData />,
  },
  {
    path: "/AddDoctor",
    element: <AddDoctor />,
  },
  {
    path: "/AddAccount",
    element: <AddAccount />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
