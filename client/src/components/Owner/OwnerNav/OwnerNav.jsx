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
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

function OwnerNav() {
  return (
    <Card className=" fixed top-0 left-0 z-40 w-64 mt-16 h-screen drop-shadow-lg transition-transform -translate-x-full sm:translate-x-0 ">
    <List>
      <div className="px-2 pt-4">

          <NavLink
            to={"/owner"}
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

          <NavLink
             to={"/owner/properties"}
             className={({ isActive }) =>
               isActive ? `bg-gray-200 text-gray-700 font-semibold` : ""
             }
          >
            <ListItem className=" p-2 hover:bg-gray-200">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              Properties
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
        </div>
      </List>
    </Card>
  );
}

export default OwnerNav;
