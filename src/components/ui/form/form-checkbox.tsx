"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  name: string;
  label: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label, className, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              id={name}
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className={clsx(
                "h-4 w-4 rounded border-border text-primary focus:ring-primary/20",
                className
              )}
              {...props}
            />
            <span className="text-sm text-foreground">{label}</span>
          </label>
          {error?.message && <span className="text-xs text-red-500">{error.message}</span>}
        </div>
      )}
    />
  );
};
