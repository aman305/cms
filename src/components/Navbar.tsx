import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFirebase } from "../context/Firebase";
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pages = ["Products", "Pricing", "Blog"];

function Navbar() {
  const firebase = useFirebase();

  const handleLogout = () => {
    firebase?.handleLogout();
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  return (
    <div>
      <header className="h-18  bg-gradient-to-r from-sky-400 to-indigo-400 flex justify-between px-2 py-1 items-center border-none w-full fixed">
        <div
          className="flex items-center cursor-pointer gap-3"
          onClick={() => navigate("/")}
        >
          <img
            className="w-14"
            src="https://thelogocompany.net/wp-content/uploads/2022/03/dragon-arms-prod4.png"
            alt=""
          />
          <h3 className="text-2xl text-white font-bold">Dragon Arms - CMS</h3>
        </div>

        <div className="flex">
          <div className="flex  items-center gap-3 text-white">
            <span
              className="cursor-pointer font-semibold"
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <span className="cursor-pointer font-semibold">About Us</span>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon fontSize="medium" style={{ color: "white" }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        {/* </div> */}
      </header>
    </div>
  );
}
export default Navbar;
