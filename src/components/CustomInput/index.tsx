// CustomInput.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInputContext } from "../../contexts/input/useContext";

interface Props {
  placeholder: string;
  icon: icon.IconDefinition;
  className?: string;
  name: string;
  value?: string;
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
  value, // sigue siendo necesario para react-hook-form
  inputAttributes,
}: Props) => {
  const { values, setValue } = useInputContext();
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Manejo del cambio, sincronizando el contexto y react-hook-form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value); // Actualiza el contexto
    onChange(e); // Pasa el cambio a react-hook-form
  };

  return (
    <motion.div
      animate={{ scale: focus ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`m-1 relative ${className} m-3`}
    >
      <div
        className={`select-none absolute top-[25%] left-8 text-[#2296f5] items-center transition-all flex flex-row gap-2 text-xl lg:text-3xl z-40 ${
          focus || (values[name] && values[name].length > 0)
            ? "-translate-y-[100%]"
            : ""
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <FontAwesomeIcon icon={icon} />
        <p className="font-semibold">{placeholder}</p>
      </div>
      <input
        ref={inputRef}
        name={name}
        value={value} // Controlado por react-hook-form
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
          onBlur();
        }}
        {...inputAttributes}
        className={`shadow-lg rounded-full outline-0 m-2 p-4 pl-6 transition-all duration-500 text-2xl w-full relative bg-[#fff] ${
          focus ? "shadow-blue-300" : "shadow-zinc-500"
        }`}
      />
    </motion.div>
  );
};

export default CustomInput;
