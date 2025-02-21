// CustomInput.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInputContext } from "../../contexts/input/useContext";

interface Props {
  placeholder: string;
  icon: icon.IconDefinition;
  className?: string;
  name:string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Añadido
  onBlur: () => void; // Añadido
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

const CustomInput = ({
  placeholder,
  icon,
  className,
  name,
  onChange,
  onBlur,
  inputAttributes,
}: Props) => {
  const { values, setValue } = useInputContext(); // Obtener los valores y la función setValue desde el contexto
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value);
  };


   // Usar useEffect para inicializar el valor en el contexto
   useEffect(() => {
    if (name && !(name in values)) {
      setValue(name, ""); // Inicializamos el valor en el contexto solo si no está presente
    }
  }, [name, values, setValue]);  // Asegurarnos de que se ejecute cuando 'name' cambie

  // Comprobamos que values[name] no sea undefined antes de intentar acceder a .length
  const isFocusedOrFilled = focus || (values[name] && values[name].length > 0);


  console.log(values)

  return (
    <motion.div
      animate={{ scale: focus ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`m-1 relative ${className} m-3`}
    >
      <div
        className={`select-none absolute top-[25%] left-8 text-[#2296f5] items-center transition-all flex flex-row gap-2 text-xl lg:text-3xl z-40 ${
          isFocusedOrFilled ? "-translate-y-[100%]" : ""
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <FontAwesomeIcon icon={icon} />
        <p className="font-semibold">{placeholder}</p>
      </div>
      <input
        onChange={handleChange} // Usar el cambio de valor desde el contexto
        onFocus={() => setFocus(true)}
        ref={inputRef}
        name={name}
        onBlur={() => 
          {setFocus(false);
          onBlur}
        }
        {...inputAttributes}
        value={values[name] || ""} // Usar el valor del contexto para este input en particular
        className={`shadow-lg rounded-full outline-0 m-2 p-4 pl-6 transition-all duration-500 text-2xl w-full relative bg-[#fff] ${
          focus ? "shadow-blue-300" : "shadow-zinc-500"
        }`}
      />
    </motion.div>
  );
};

export default CustomInput;
