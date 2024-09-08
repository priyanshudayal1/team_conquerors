import { Avatar, Button, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import studentUser from "../../../public/userIcon.png";
import { updateUserData } from "../../utils/helper";
const Header = ({ title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    updateUserData();
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
      console.log("User data found",JSON.parse(storedData));
    } else {
      console.log("No user data found");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-700 mb-4 md:mb-0">
        {title}
      </h1>
      <div className="flex items-center space-x-4">
        <p className="text-lg">Welcome, {userData ? userData.data.name : ""} !</p>
        <Avatar
          alt="user"
          src={userData?.role==='student' ? studentUser : ""}
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
              onClick={handleLogout}
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