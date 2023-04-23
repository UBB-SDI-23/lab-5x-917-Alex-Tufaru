import { Container, CssBaseline, Typography } from "@mui/material";
import React from "react";

export const AppHome = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        {/* <Typography variant="h1" component="h1" gutterBottom>
          Welcome to my comics collection app! Use the menu above to navigate.
        </Typography> */}
        <p>
          Welcome to my comics collection app! Use the menu above to navigate.
        </p>
      </Container>
    </React.Fragment>
  );
};
