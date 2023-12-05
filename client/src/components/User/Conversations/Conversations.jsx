import React from "react";
import { Avatar, Badge, Box, Stack, Typography, styled } from "@mui/material";
import { GoVerified } from "react-icons/go";

const Conversations = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <Stack
      gap={2}
      direction={'flex'}
      alignItems={"center"}
      px={2}
      py={1}
      className="hover:cursor-pointer bg-blue-gray-50 rounded-md"
      color={"white"}
    >
      
        <Stack>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src="https://res.cloudinary.com/dn6anfym7/image/upload/v1700566625/dreamHome/arqhv0bipniec9xpfu7m.jpg"
            />
          </StyledBadge>
        </Stack>
        <Stack direction={"column"} fontSize={"sm"}>
          <Typography color={'black'} fontWeight={"700"} display={"flex"} alignItems={"center"}>
            johndoe <GoVerified className="w-4 h-4 ml-1" />
            
          </Typography>
          <Typography color={'black'} className="text-xs" display={"flex"} gap={1}>helooo, how are you ......</Typography>
        </Stack>
    </Stack>
  );
};

export default Conversations;
