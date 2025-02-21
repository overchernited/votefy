import { createContext, useState } from 'react';

// Definir el tipo de datos que vas a manejar en el contexto
export interface InputContextType {
    values: { [key: string]: string };
    setValue: (name: string, value: string) => void;
  }
  

// Crear el contexto con un valor por defecto
const InputContext = createContext<InputContextType | undefined>(undefined);

// Componente Proveedor de Contexto
export const InputProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [values, setValues] = useState<{ [key: string]: string }>({});
  
    const setValue = (name: string, value: string) => {
      // Si la clave 'name' no existe aún en values, la inicializamos con un valor vacío
      setValues((prev) => ({
        ...prev,
        [name]: prev[name] !== undefined ? value : ""  // Asegura que 'name' tenga valor por defecto
      }));
    };
  
    return (
      <InputContext.Provider value={{ values, setValue }}>
        {children}
      </InputContext.Provider>
    );
  };

export default InputContext