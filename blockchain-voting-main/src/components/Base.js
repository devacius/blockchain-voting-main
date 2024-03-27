import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const Base = ({ isOwner }) => {
  // Admin check here
  const pages = ["Home", "Candidate Details", "Apply for Voter", "Vote"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const SideBarItem = ({ text, url }) => (
    <MenuItem onClick={handleCloseNavMenu}>
      <Link to={url} style={{ textDecoration: "none" }}>
        <Typography textAlign="center">{text}</Typography>
      </Link>
    </MenuItem>
  );

  const NavBarItem = ({ text, url }) => (
    <Link to={url} style={{ textDecoration: "none" }}>
      <Button
        onClick={handleCloseNavMenu}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {text}
      </Button>
    </Link>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            VOTING APP
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <SideBarItem text="Home" url="/" />
              {/* <SideBarItem text="Candidate Details" url="/candidateDetails" /> */}
              <SideBarItem text="Apply for Voter" url="/applyForVoter" />
              <SideBarItem text="Vote" url="/vote" />
              {isOwner ? (
                <div>
                  <SideBarItem text="Results" url="/result" />
                  {/* <SideBarItem text="Verify Voter" url="/" /> */}
                  <SideBarItem text="Add Candidate" url="/addCandidate" />
                  {/* <SideBarItem text="Start/End" url="/toggle" /> */}
                </div>
              ) : (
                ""
              )}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Voting App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavBarItem text="Home" url="/" />
            {/* <NavBarItem text="Candidate Details" url="/" /> */}
            <NavBarItem text="Apply for voter" url="/applyForVoter" />
            <NavBarItem text="Vote" url="/vote" />
            {isOwner ? (
              <>
                {/* <NavBarItem text="Verify Voter" url="/" /> */}
                <NavBarItem text="Results" url="/result" />
                <NavBarItem text="Add Candidate" url="/addCandidate" />
                {/* <NavBarItem text="Start/End" url="/toggle" /> */}
              </>
            ) : (
              <></>
            )}
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Base;
