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
        className: "btn-primary-outline",
      },
      {
        palette: "primary",
        variant: "outline",
        disabled: true,
        className: "cursor-not-allowed opacity-50",
      },
      // Secondary Outline variants
      {
        palette: "secondary",
        variant: "outline",
        disabled: false,
        className: "btn-secondary-outline",
      },
      {
        palette: "secondary",
        variant: "outline",
        disabled: true,
        className: "cursor-not-allowed opacity-50",
      },
      // Negative Outline variants
      {
        palette: "negative",
        variant: "outline",
        disabled: false,
        className: "btn-negative-outline",
      },
      {
        palette: "negative",
        variant: "outline",
        disabled: true,
        className: "cursor-not-allowed opacity-50",
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
