import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";

function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    ); 
  }, []);

  return (
    <div className=" max-h-[768px] w-[calc(100%+48px)]">
      <Navbar className="sticky \top-0 z-10 h-max max-w-full rounded-none px-5 py-2 lg:px-12 lg:py-4">
        <div className="flex items-center justify-between text-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Material Tailwind
          </Typography>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1 ">
              <Button
                variant="outlined"
                color="gray"
                className="flex font-normal text-gray-700 me-5 justify-center items-center"
              >
                <PowerIcon className="w-5 me-2" />
                Log out
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          <div className="flex items-center gap-x-1">
            <Button
              variant="outlined"
              color="gray"
              className="flex font-normal text-gray-700 me-5 justify-center items-center"
            >
              <PowerIcon className="w-5 me-2" />
              Log out
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default Header;
