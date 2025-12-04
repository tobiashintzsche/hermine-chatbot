"use client";

import { cn } from "../../lib/utils";

interface FloatingButtonProps {
  isOpen: boolean;
  onClick: () => void;
  imageUrl?: string;
  imageLoaded?: boolean;
  width?: number | string;
  height?: number | string;
  tooltipText?: string;
}

export function FloatingButton({
  isOpen,
  onClick,
  imageUrl,
  imageLoaded = false,
  width = 60,
  height = 60,
  tooltipText,
}: FloatingButtonProps) {
  // Button erst zeigen wenn imageLoaded (wird gesetzt nach Image-Load)
  const showButton = imageLoaded === true;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center",
        "rounded-full cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "transition-opacity duration-500 ease-out",
        // CSS Custom Properties für Farben
        "bg-[var(--widget-button-bg,#6B7280)]",
        "border-2 border-[var(--widget-button-border,var(--widget-button-bg,#6B7280))]",
        "hover:brightness-110",
        showButton ? "opacity-100 shadow-lg" : "opacity-0 shadow-none"
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        padding: imageUrl ? "0" : "10px",
        pointerEvents: showButton ? "auto" : "none",
      }}
      aria-label={isOpen ? "Chat schließen" : tooltipText || "Chat öffnen"}
      title={tooltipText}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Chat"
          className="w-full h-full rounded-full object-cover"
        />
      )}
    </button>
  );
}
