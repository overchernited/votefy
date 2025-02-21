import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  style: "primary" | "styled" | "error" | "success";
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  enterAsClick?: boolean;
}

const MagicButton = (props: ButtonProps) => {
  const baseStyle =
    "rounded-full flex items-center justify-center font-semibold p-2 text-2xl m-2 transition-all duration-200 hover:scale-[1.1] active:scale-[1.15]";
  const typeStyles = {
    primary: "bg-[#222121] border-[#393939] text-white",
    styled: "bg-[#2296f5] shadow-xl hover:shadow-blue-400 text-white",
    error: "bg-[#b30008] border-[#980004] text-white",
    success: "bg-[#00cc4c] border-[#00a63e] text-white",
  };

  return (
    <button
      className={`${props.className} ${baseStyle} ${typeStyles[props.style]} ${
        props.disabled ? " opacity-80 cursor-not-allowed" : "cursor-pointer"
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default MagicButton;
