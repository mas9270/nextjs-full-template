"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

interface Option {
  label: string;
  value: string | number;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  placeholder,
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
          <select
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
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error?.message && <span className="text-xs text-red-500">{error.message}</span>}
        </div>
      )}
    />
  );
};
