import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArticleIcon from "@mui/icons-material/Article";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";

const drawerWidth = 240;

const dashTheme = createTheme({
  typography: {
    fontFamily: "'Manrope', 'Segoe UI', sans-serif",
    h4: { fontFamily: "'Sora', 'Manrope', sans-serif" },
    h5: { fontFamily: "'Sora', 'Manrope', sans-serif" },
    h6: { fontFamily: "'Sora', 'Manrope', sans-serif" },
  },
  palette: {
    primary: {
      main: '#27324a',
      light: '#475676',
      dark: '#1a2336',
    },
    secondary: {
      main: '#C5BAFF',
    },
    background: {
      default: '#FBFBFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#27324a',
      secondary: '#475676',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'rgba(39, 50, 74, 0.12) 0 2px 12px -4px',
          borderBottom: '1px solid rgba(197, 186, 255, 0.4)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(197, 186, 255, 0.4)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'rgba(39, 50, 74, 0.10) 0 4px 16px -6px',
          border: '1px solid rgba(196, 217, 255, 0.5)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'rgba(39, 50, 74, 0.10) 0 4px 16px -6px',
          border: '1px solid rgba(196, 217, 255, 0.5)',
        },
      },
    },
  },
});
const dashboardNavItems = [
  {
    label: 'Dashboard',
    title: 'Dashboard',
    to: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'Reports',
    title: 'Reports',
    to: '/dashboard/reports',
    icon: AssessmentIcon,
  },
  {
    label: 'Article List',
    title: 'Article List',
    to: '/dashboard/article-list',
    icon: ArticleIcon,
  },
  {
    label: 'Users',
    title: 'Users',
    to: '/dashboard/users',
    icon: PeopleIcon,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const getPageTitle = (pathname, navItems) =>
  navItems.find(({ to }) => to === pathname)?.title ?? 'Welcome';

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const userRole = localStorage.getItem('type');
  const visibleNavItems = userRole === 'admin'
    ? dashboardNavItems
    : dashboardNavItems.filter((item) => item.to !== '/dashboard/users');
  const pageTitle = getPageTitle(location.pathname, visibleNavItems);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={dashTheme}>
      <Box className="dash-layout" sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 5, ...open }}
            >
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {pageTitle}
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button color="inherit" variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {visibleNavItems.map(({ label, to, icon: Icon }) => (
              <ListItem key={to} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={Link}
                  to={to}
                  selected={location.pathname === to}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? 'initial' : 'center',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 5, minHeight: '100vh', bgcolor: '#FAFBFC' }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashLayout;
