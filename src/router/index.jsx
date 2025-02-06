import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import Property from "../pages/propety/property";
import Agency from "../pages/agency/agency";
import Contact from "../pages/contact/contact";
const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<Property />} />
        <Route path="/agency" element={<Agency />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;
