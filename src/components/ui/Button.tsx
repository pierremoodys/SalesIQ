"use client";

import React from "react";
import { Button as HeadlessButton } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base classes
  "inline-flex justify-center items-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        s: "py-1 px-3 text-sm leading-[1.375rem] gap-2",
        m: "py-2 px-4 leading-6 gap-2",
        l: "py-2 px-4 text-lg font-light leading-7 gap-2",
      },
      palette: {
        primary: "",
        secondary: "",
        tertiary: "",
        negative: "",
      },
      variant: {
        outline: "",
        filled: "",
        ghost: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Primary Outline variants
      {
        palette: "primary",
        variant: "outline",
        disabled: false,
        className:
          "border-2 border-brand-moody-bright-blue text-brand-moody-bright-blue bg-transparent hover:border-bright-blue-500 hover:text-bright-blue-500 active:border-bright-blue-900 active:text-bright-blue-900 active:bg-white focus:bg-white focus:border-brand-moody-bright-blue focus:text-brand-moody-bright-blue focus:ring-bright-blue-700",
      },
      {
        palette: "primary",
        variant: "outline",
        disabled: true,
        className:
          "border-2 border-gray-300 text-gray-300 bg-transparent cursor-not-allowed",
      },
      // Secondary Outline variants
      {
        palette: "secondary",
        variant: "outline",
        disabled: false,
        className:
          "border-2 border-gray-300 text-gray-800 bg-transparent hover:border-gray-100 hover:bg-gray-100 hover:text-gray-800 active:border-gray-100 active:text-gray-800 active:bg-transparent focus:bg-white focus:text-gray-800 focus:border-transparent focus:ring-gray-500",
      },
      {
        palette: "secondary",
        variant: "outline",
        disabled: true,
        className:
          "border-2 border-gray-300 text-gray-300 bg-transparent cursor-not-allowed",
      },
      // Negative Outline variants
      {
        palette: "negative",
        variant: "outline",
        disabled: false,
        className:
          "border-2 border-brand-moody-red text-brand-moody-red bg-transparent hover:border-brand-moody-red hover:bg-red-100 hover:text-brand-moody-red active:border-brand-moody-red active:bg-red-300 active:text-brand-moody-red focus:bg-white focus:text-brand-moody-red focus:border-transparent focus:ring-red-500",
      },
      {
        palette: "negative",
        variant: "outline",
        disabled: true,
        className:
          "border-2 border-gray-300 text-gray-300 bg-transparent cursor-not-allowed",
      },
    ],
    defaultVariants: {
      size: "m",
      palette: "primary",
      variant: "outline",
      disabled: false,
    },
  }
);

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      size,
      palette,
      variant,
      disabled,
      children,
      icon,
      iconPosition = "left",
      loading,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const iconSizeMap: Record<"s" | "m" | "l", string> = {
      s: "w-4 h-4",
      m: "w-5 h-5",
      l: "w-[22px] h-[22px]",
    };

    const iconSize = iconSizeMap[size || "m"];

    const renderIcon = () => {
      if (!icon) return null;

      return <span className={cn(iconSize, "flex-shrink-0")}>{icon}</span>;
    };

    const renderContent = () => (
      <>
        {iconPosition === "left" && renderIcon()}
        <span className="whitespace-nowrap">{children}</span>
        {iconPosition === "right" && renderIcon()}
      </>
    );

    return (
      <HeadlessButton
        className={cn(
          buttonVariants({
            size,
            palette,
            variant,
            disabled: isDisabled,
          }),
          className
        )}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {renderContent()}
      </HeadlessButton>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
