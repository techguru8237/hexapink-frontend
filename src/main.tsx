import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import * as Sentry from "@sentry/react";

import { UserProvider } from "./contexts/User.tsx";
import { LoadingProvider } from "./contexts/Loading.tsx";
import { CurrencyProvider } from "./contexts/Currency.tsx";

import "./index.css";
import App from "./App.tsx";
import StripeContext from "./contexts/StripeContext.tsx";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#4040BF",
      contrastText: "#FFFFFF", // Set contrast text color to white
    },
    secondary: {
      main: "#FF6699",
      contrastText: "#FFFFFF", // Set contrast text color to white
    },
  },
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px", // Fully rounded on left and right sides
          padding: "6px 16px", // Adjust padding as needed
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          border: "none", // Removes the border
          "&:focus": {
            outline: "none", // Removes the focus outline
          },
        },
      },
    },
  },
});


Sentry.init({
  dsn: "https://71cd25b489800b1cdb8fcb970d6ce595@o4508972035604480.ingest.de.sentry.io/4508972039733328",
  integrations: [Sentry.browserTracingIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", "https://hexapink.fr"],
});

// Ensure that the custom theme is applied correctly
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <CurrencyProvider>
          <ThemeProvider theme={theme}>
            <UserProvider>
              <StripeContext>
                <App />
              </StripeContext>
            </UserProvider>
          </ThemeProvider>
        </CurrencyProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
