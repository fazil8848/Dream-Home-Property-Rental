import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";

import {BsBuildingsFill} from 'react-icons/bs'
import {FaUsers} from 'react-icons/fa6'
import {LiaUsersSolid} from 'react-icons/lia'

import { NavLink } from "react-router-dom";

function AdminNavbar() {
  return (
    <Card className="fixed top-0 left-0 z-40 w-64 mt-24 h-screen transition-transform -translate-x-full sm:translate-x-0 ">
    <List>
      <div className="px-2">

          <NavLink
            to={"/admin"}
            className={({ isActive }) =>
              isActive ? `bg-gray-200 text-gray-700 font-semibold` : ""
            }
          >
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 me-3" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </NavLink>

          <NavLink
             to={"/admin/users"}
             className={({ isActive }) =>
               isActive ? `bg-gray-200 text-gray-700 font-semibold` : ""
             }
          >
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <LiaUsersSolid className="h-5 w-5 me-3" />
              </ListItemPrefix>
              Users
            </ListItem>
          </NavLink>

          <NavLink
             to={"/admin/owners"}
             className={({ isActive }) =>
               isActive ? `bg-gray-200 text-gray-700 font-semibold` : ""
             }
          >
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <FaUsers className="h-5 w-5 me-3" />
              </ListItemPrefix>
              Owners
            </ListItem>
          </NavLink>

          <NavLink
             to={"/admin/properties"}
             className={({ isActive }) =>
               isActive ? `bg-gray-200 text-gray-700 font-semibold` : ""
             }
          >
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <BsBuildingsFill className="h-5 w-5 me-3" />
              </ListItemPrefix>
              Properties
            </ListItem>
          </NavLink>

          <NavLink>
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5 me-3" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          </NavLink>

          <NavLink>
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5 me-3" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </NavLink>
          <NavLink>
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5 me-3" />
              </ListItemPrefix>
              Settings
            </ListItem>
          </NavLink>
        </div>
      </List>
    </Card>
  );
}

export default AdminNavbar;
