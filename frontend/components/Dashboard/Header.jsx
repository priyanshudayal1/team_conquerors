'use client';

import React from "react";
import { Avatar, Button, Popover } from "@mui/material";
import { useState } from "react";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-700 mb-4 md:mb-0">
        Student Dashboard
      </h1>
      <div className="flex items-center space-x-4">
        <p className="text-lg">Welcome, Mohmmad Nagir Vatsal Ke Bhai!</p>
        <Avatar
          alt="user"
          src=""
          onClick={handleAvatarClick}
          style={{ cursor: "pointer" }}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className="p-4">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => alert("Logout")}
            >
              Logout
            </Button>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
