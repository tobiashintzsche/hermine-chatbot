"use client";

import type { RefObject, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { cn } from "../../../lib/utils";

interface ChatInputFormProps {
  input: string;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  placeholder?: string;
  isDisabled: boolean;
  isSubmitDisabled: boolean;
  showResetButton?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onReset?: () => void;
}

interface ResetButtonProps {
  onClick: () => void;
}

function ResetButton({ onClick }: ResetButtonProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center py-2">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "text-xs text-gray-500 transition-all",
          "hover:text-gray-700 hover:underline"
        )}
      >
        {t("input.newConversation")}
      </button>
    </div>
  );
}

export function ChatInputForm({
  input,
  textareaRef,
  placeholder,
  isDisabled,
  isSubmitDisabled,
  showResetButton,
  onChange,
  onKeyDown,
  onSubmit,
  onReset,
}: ChatInputFormProps) {
  const { t } = useTranslation();
  const defaultPlaceholder = t("input.placeholder");

  return (
    <div className="border-t border-gray-200 p-4">
      <form onSubmit={onSubmit} className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder || defaultPlaceholder}
          disabled={isDisabled}
          rows={1}
          className={cn(
            "flex-1 resize-none rounded-xl border border-gray-200",
            "px-4 py-3 text-sm leading-5",
            "bg-white text-gray-900 placeholder-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:bg-gray-50 disabled:cursor-not-allowed",
            "max-h-24 overflow-y-auto"
          )}
        />
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={cn(
            "flex items-center justify-center",
            "w-10 h-10 rounded-xl transition-all",
            // CSS Custom Property mit Fallback
            "bg-[var(--widget-input-button,#3B82F6)] text-white",
            "hover:brightness-110",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
          )}
          aria-label="Nachricht senden"
        >
          <Send size={18} />
        </button>
      </form>
      {showResetButton && onReset && <ResetButton onClick={onReset} />}
    </div>
  );
}
