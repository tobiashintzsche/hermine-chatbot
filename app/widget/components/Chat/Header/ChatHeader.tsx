"use client";

import { X, Maximize2, Minimize2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../../../lib/utils";

interface HeaderButtonProps {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}

function HeaderButton({ onClick, ariaLabel, children }: HeaderButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-lg transition-colors duration-200",
        "hover:bg-gray-100",
        "focus:outline-none focus:ring-2 focus:ring-gray-200"
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

interface ChatHeaderProps {
  title?: string;
  titleColor?: string;
  subtitle?: string;
  subtitleColor?: string;
  logoUrl?: string;
  showLogo?: boolean;
  isFullScreen?: boolean;
  fullScreenEnabled?: boolean;
  onToggleFullScreen?: () => void;
  onClose: () => void;
}

export function ChatHeader({
  title,
  titleColor,
  subtitle,
  subtitleColor,
  logoUrl,
  showLogo = true,
  isFullScreen,
  fullScreenEnabled = true,
  onToggleFullScreen,
  onClose,
}: ChatHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        {logoUrl && showLogo && (
          <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
        )}

        <div className="flex items-center gap-1 ml-auto">
          {fullScreenEnabled && onToggleFullScreen && (
            <HeaderButton
              onClick={onToggleFullScreen}
              ariaLabel={
                isFullScreen
                  ? t("header.fullscreenExit")
                  : t("header.fullscreenEnter")
              }
            >
              {isFullScreen ? (
                <Minimize2 size={20} className="text-gray-600" />
              ) : (
                <Maximize2 size={20} className="text-gray-600" />
              )}
            </HeaderButton>
          )}
          <HeaderButton onClick={onClose} ariaLabel={t("header.close")}>
            <X size={24} className="text-gray-600" />
          </HeaderButton>
        </div>
      </div>

      {(title || subtitle) && (
        <div className="px-4 pb-4">
          {title && (
            <h2
              className="text-lg font-semibold"
              style={{ color: titleColor || "#111827" }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className="text-sm mt-1"
              style={{ color: subtitleColor || "#6B7280" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
