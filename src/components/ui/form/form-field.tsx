"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  helperText,
  className,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1 w-full text-start">
          {label && (
            <label htmlFor={name} className="text-sm font-medium text-foreground">
              {label}
            </label>
          )}
          <input
            {...field}
            {...props}
            id={name}
            value={field.value ?? ""}
            className={clsx(
              "w-full px-3 py-2 text-sm rounded-lg border bg-card text-foreground transition-colors duration-150 outline-none",
              "focus:ring-2 focus:ring-primary/20 focus:border-primary",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-border",
              className
            )}
          />
          {error?.message ? (
            <span className="text-xs text-red-500 font-normal">{error.message}</span>
          ) : helperText ? (
            <span className="text-xs text-muted-foreground">{helperText}</span>
          ) : null}
        </div>
      )}
    />
  );
};
