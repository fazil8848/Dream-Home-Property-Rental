import React from "react";
import { Routes, Route } from "react-router-dom";
import OwnerLayout from "../../Layouts/OwnerLayout";
import OwnerHome from "../../Pages/Owner/Home/OwnerHome";
import OwnerProperties from "../../Pages/Owner/Properties/OwnerProperties";
import PrivateRoutesOwner from "./Private/PrivateRoutesOwner";
import OwnerLoginPage from "../../Pages/Owner/Login/OwnerLogin";
import OwnerSignupPage from "../../Pages/Owner/Signup/OwnerSignupPage";

const OwnerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<OwnerLayout />}>
        {/* <Route path="" element={<PrivateRoutesOwner />}> */}
          <Route index element={<OwnerHome />} />
          <Route path="properties" element={<OwnerProperties />} />
        {/* </Route> */}
        <Route path="login" element={<OwnerLoginPage/>} />
        <Route path="signup" element={<OwnerSignupPage/>} />
      </Route>
    </Routes>
  );
};

export default OwnerRoutes;
