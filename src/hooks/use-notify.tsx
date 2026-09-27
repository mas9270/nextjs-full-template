"use client";

import { toast, ToastOptions } from "react-toastify";
import { ApiResponse } from "@/types/api";

export type NotifyType = "info" | "success" | "warning" | "error";

export function useNotify() {
  const notify = (
    message: React.ReactNode,
    type: NotifyType = "info",
    options?: ToastOptions
  ) => {
    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "warning":
        toast.warn(message, options);
        break;
      default:
        toast.info(message, options);
        break;
    }
  };

  const handleApiError = (error: any, fallbackMessage = "خطایی در پردازش رخ داد") => {
    const errorResponse: ApiResponse<null> | undefined =
      error?.response?.data || error;

    if (errorResponse) {
      const mainMessage = errorResponse.message || fallbackMessage;
      const fieldErrors = errorResponse.errors;

      if (fieldErrors && Object.keys(fieldErrors).length > 0) {
        const errorList = Object.entries(fieldErrors).flatMap(
          ([_, messages]) => messages
        );

        toast.error(
          <div className="flex flex-col gap-1 text-xs text-right">
            <span className="font-bold">{mainMessage}</span>
            <ul className="list-disc pr-4 space-y-0.5 opacity-90">
              {errorList.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>,
          { autoClose: 6000 }
        );
        return;
      }

      toast.error(mainMessage);
      return;
    }

    toast.error(fallbackMessage);
  };

  return {
    notify,
    handleApiError,
  };
}
