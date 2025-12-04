"use client";

import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../../../lib/utils";

interface ChatInputProps {
  input: string;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  placeholder?: string;
  isDisabled: boolean;
  isSubmitDisabled: boolean;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  showResetButton?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset?: () => void;
}

export function ChatInput({
  input,
  textareaRef,
  placeholder,
  isDisabled,
  isSubmitDisabled,
  buttonBackgroundColor = "#6B7280",
  buttonTextColor = "#FFFFFF",
  showResetButton = false,
  onChange,
  onKeyDown,
  onSubmit,
  onReset,
}: ChatInputProps) {
  const { t } = useTranslation();

  return (
    <div className="border-t border-gray-200 p-4">
      <form onSubmit={onSubmit} className="flex gap-3 items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder || t("input.placeholder")}
          disabled={isDisabled}
          rows={1}
          className={cn(
            "flex-1 resize-none rounded-xl border border-gray-300",
            "px-4 py-3 text-sm leading-5",
            "max-h-24 min-h-[44px]",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent",
            "disabled:bg-gray-50 disabled:cursor-not-allowed",
            "placeholder:text-gray-400"
          )}
        />
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={cn(
            "flex items-center justify-center",
            "w-11 h-11 rounded-xl",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "hover:opacity-90 hover:scale-105",
            "focus:outline-none focus:ring-2 focus:ring-offset-2"
          )}
          style={{
            backgroundColor: isSubmitDisabled
              ? "#D1D5DB"
              : buttonBackgroundColor,
            color: buttonTextColor,
          }}
        >
          <Send size={20} />
        </button>
      </form>

      {showResetButton && onReset && (
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={onReset}
            className={cn(
              "text-sm text-gray-500",
              "transition-colors duration-200",
              "hover:text-gray-700 hover:underline"
            )}
          >
            {t("input.newConversation")}
          </button>
        </div>
      )}
    </div>
  );
}
