import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./provider/SnackBarProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
