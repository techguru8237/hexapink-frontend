import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
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
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4040BF", // Change border color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4040BF", // Change this to your custom color when focused
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#4040BF", // Change label color when focused
          },
        },
      },
    },
  },
});

// Ensure that the custom theme is applied correctly
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
        <LoadingProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
