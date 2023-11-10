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
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

function AdminNavbar() {
  return (
    <Card className="h-[88vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
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
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </NavLink>

          <NavLink>
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              Users
            </ListItem>
          </NavLink>

          <NavLink>
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
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
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </NavLink>
          <NavLink>
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
          </NavLink>
          <NavLink>
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </NavLink>
        </div>
      </List>
    </Card>
  );
}

export default AdminNavbar;
