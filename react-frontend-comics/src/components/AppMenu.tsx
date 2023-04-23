import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { cyan } from "@mui/material/colors";

export const AppMenu = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ marginBottom: "20px" }}>
        <Toolbar sx={{ backgroundColor: cyan[500] }}>
          <IconButton
            component={Link}
            to="/"
            size="large"
            edge="start"
            color="inherit"
            aria-label="school"
            sx={{ mr: 2 }}
          >
            <SchoolIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ mr: 5 }}>
            Comics collection
          </Typography>
          <Button
            variant={path.startsWith("/comics") ? "outlined" : "text"}
            to="/comics"
            component={Link}
            color="inherit"
            sx={{ mr: 5 }}
            startIcon={<LocalLibraryIcon />}
          >
            Comics
          </Button>
          <Button
            variant={
              path.startsWith("/comics/filter/chooseNumber")
                ? "outlined"
                : "text"
            }
            to="/comics/filter/chooseNumber"
            component={Link}
            color="inherit"
            sx={{ mr: 5 }}
          >
            Filter
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
