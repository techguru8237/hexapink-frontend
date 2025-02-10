import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import { LoadingProvider } from "./contexts/Loading.tsx";
import { ThemeProvider, createTheme } from "@mui/material"; // Import ThemeProvider and createTheme

import "./index.css";
import App from "./App.tsx";

// Create a custom theme
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          outline: "none",
          "&:hover fieldset": {
            borderColor: "#4040BF", // Change border color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4040BF", // Change border color when focused
          },
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <LoadingProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </LoadingProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);
