import React from "react";
import AdminNavbar from "../../../components/Admin/AdminNavbar/AdminNavbar";
import OwnerList from "../../../components/Admin/OwnerList/OwnerList";

function OwnerListing() {
  return (
    <div className="flex">
      <AdminNavbar />
      <OwnerList />
    </div>
  );
}

export default OwnerListing;