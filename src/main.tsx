import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App></App>
  </StrictMode>
);
