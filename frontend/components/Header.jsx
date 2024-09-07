import React from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";
import { Button } from "@mui/material";

function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between px-10 py-4 h-auto md:h-16 bg-blue-600 bg-opacity-90 shadow-md">
      <div className="logo flex flex-row gap-4 justify-center items-center mb-4 md:mb-0">
        <Image src={logo} alt="logo" width={50} height={50} />
        <span className="font-bold leading-relaxed text-3xl text-white">
          PMSSS
        </span>
      </div>
      <div className="nav-links flex flex-col md:flex-row gap-4 md:gap-6 items-center">
        <Link href="/login" passHref>
          <Button
            variant="contained"
            color="primary"
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            Login
          </Button>
        </Link>
        <Link href="/register" passHref>
          <Button
            variant="contained"
            color="secondary"
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;