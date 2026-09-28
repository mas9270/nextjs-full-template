"use client";

import React from "react";
import { FieldValues, UseFormReturn, FormProvider } from "react-hook-form";
import clsx from "clsx";

interface FormProps<T extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
}

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx("space-y-4", className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}
