import { Container, CssBaseline } from "@mui/material";
import React from "react";

export const AppHome = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <p>
          Welcome to my comics collection app! Use the menu above to navigate.
        </p>
      </Container>
    </React.Fragment>
  );
};
