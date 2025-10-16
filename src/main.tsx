import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { CharacterSection } from "./modules/characters/components/CharacterSection";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <CharacterSection />
    </PrimeReactProvider>
  </StrictMode>
);
