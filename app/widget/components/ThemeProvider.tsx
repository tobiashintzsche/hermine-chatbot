"use client";

import type { ReactNode } from "react";
import type { ISettings } from "../../settings";

interface ThemeProviderProps {
  children: ReactNode;
  settings: ISettings;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ThemeProvider setzt CSS Custom Properties aus den Widget-Settings.
 *
 * Verwendung in Komponenten:
 * - Tailwind: className="bg-[var(--widget-primary)]"
 * - Hover: className="hover:brightness-110" (funktioniert mit jeder Farbe!)
 */
export function ThemeProvider({
  children,
  settings,
  className,
  style,
}: ThemeProviderProps) {
  const { chat, floatingButton } = settings;

  const cssVariables: Record<string, string | undefined> = {
    "--widget-primary": chat?.primaryColor,
    "--widget-button-bg": floatingButton?.backgroundColor,
    "--widget-button-border": floatingButton?.borderColor,
    "--widget-user-bg": chat?.messages?.user?.backgroundColor,
    "--widget-user-text": chat?.messages?.user?.textColor,
    "--widget-ai-bg": chat?.messages?.ai?.backgroundColor,
    "--widget-ai-text": chat?.messages?.ai?.textColor,
    "--widget-input-button":
      chat?.input?.buttonBackgroundColor || chat?.primaryColor,
    "--widget-header-title": chat?.header?.titleColor,
    "--widget-header-subtitle": chat?.header?.subtitleColor,
  };

  // Filter out undefined values
  const filteredVariables = Object.fromEntries(
    Object.entries(cssVariables).filter(([, value]) => value !== undefined)
  );

  return (
    <div
      className={className}
      style={
        {
          ...filteredVariables,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
