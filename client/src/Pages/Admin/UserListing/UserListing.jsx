import React from "react";
import UserList from "../../../components/Admin/UserList/UserList";
import AdminNavbar from "../../../components/Admin/AdminNavbar/AdminNavbar";

function UserListing() {
  return (
    <div className="flex">
      <AdminNavbar />
      <UserList />
    </div>
  );
}

export default UserListing;
