import InputContext from "./inputContext";
import { InputContextType } from "./inputContext";
import { useContext } from "react";

export const useInputContext = (): InputContextType => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputContext debe usarse dentro de un InputProvider");
  }
  return context;
};