"use client";

import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

export function ErrorBanner({ message, onClose }: ErrorBannerProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3",
        "bg-red-50 border-l-4 border-red-500",
        "px-4 py-3 text-sm text-red-700"
      )}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className={cn(
          "p-1 rounded transition-colors",
          "hover:bg-red-100",
          "focus:outline-none"
        )}
        aria-label={t("error.close")}
      >
        <X size={16} />
      </button>
    </div>
  );
}
