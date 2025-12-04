"use client";

import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

export function ErrorBanner({ message, onClose }: ErrorBannerProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between gap-2 px-4 py-3 bg-red-50 border-b border-red-200">
      <span className="text-sm text-red-700">{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded text-red-500 hover:bg-red-100 transition-colors"
        aria-label={t("error.close")}
      >
        <X size={16} />
      </button>
    </div>
  );
}
