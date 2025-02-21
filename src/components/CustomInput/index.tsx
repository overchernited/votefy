import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  placeholder: string;
  icon: icon.IconDefinition;
  className?: string;
  value: string; // Añadido para react-hook-form
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Añadido
  onBlur: () => void; // Añadido
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

const CustomInput = ({
  placeholder,
  icon,
  className,
  value,
  onChange,
  onBlur,
  inputAttributes,
}: Props) => {
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      animate={{ scale: focus ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`m-1 relative ${className} m-3
      }`}
    >
      <div
        className={`select-none absolute top-[25%] left-8 text-[#2296f5] items-center transition-all flex flex-row gap-2 text-xl lg:text-3xl z-40 ${
          focus || value.length > 0 ? "-translate-y-[100%]" : ""
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <FontAwesomeIcon icon={icon} />
        <p className="font-semibold">{placeholder}</p>
      </div>
      <input
        onChange={onChange} // Conectado con react-hook-form
        onFocus={() => setFocus(true)}
        ref={inputRef}
        onBlur={() => {
          setFocus(false);
          onBlur(); // Conectado con react-hook-form
        }}
        {...inputAttributes}
        value={value} // Conectado con react-hook-form
        className={`shadow-lg rounded-full outline-0 m-2 p-4 pl-6 transition-all duration-500 text-2xl w-full relative bg-[#fff] ${
          focus ? "shadow-blue-300" : "shadow-zinc-500"
        }
        }`}
      />
    </motion.div>
  );
};

export default CustomInput;
