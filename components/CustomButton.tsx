"use client";
import Image from "next/image";
import { CustomButtonProps } from "@/Types";

const CustomButton = ({
  containerStyles,
  title,
  handleClick,
  textStyles,
  rightIcon,
  isDisabled,
}: CustomButtonProps) => {
  return (
    <button
      type={"button"}
      disabled={isDisabled}
      className={`custom-btn ${containerStyles} `}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt={rightIcon}
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
