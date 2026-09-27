"use client";

import { ToastContainer, ToastContainerProps } from "react-toastify";
// import "react-toastify/ReactToastify.css";

interface ToastProviderProps extends Partial<ToastContainerProps> {}

export function ToastProvider(props: ToastProviderProps) {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      className="text-sm font-medium"
      {...props}
    />
  );
}
