import { PrimeReactProvider } from "primereact/api";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { ToastService } from "./modules/common/services/ToastService";
import { CharacterSection } from "./modules/characters/components/CharacterSection";

const App = () => {
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    ToastService.register(toastRef);
  }, []);

  return (
    <PrimeReactProvider>
      <Toast ref={toastRef} />
      <CharacterSection />
    </PrimeReactProvider>
  );
};

export default App;
