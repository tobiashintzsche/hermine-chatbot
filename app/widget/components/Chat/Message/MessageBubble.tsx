"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../../../lib/utils";
import type { Message } from "../../../types";

interface MessageBubbleProps {
  message: Message;
  conversationId?: string;
  onFeedbackClick?: (messageId: string) => void;
  isStreaming?: boolean;
}

export function MessageBubble({
  message,
  conversationId,
  onFeedbackClick,
  isStreaming = false,
}: MessageBubbleProps) {
  const { t } = useTranslation();
  const isUser = message.role === "user";

  if (!isUser) {
    const showFeedbackButton =
      !message.hasErrors &&
      !message.isWelcome &&
      conversationId &&
      onFeedbackClick &&
      !isStreaming;

    return (
      <div className="flex justify-start mb-4">
        <div
          className={cn(
            "max-w-[85%] rounded-2xl rounded-bl-md px-4 py-3",
            "prose prose-sm max-w-none",
            // CSS Custom Properties
            "bg-[var(--widget-ai-bg,#F3F4F6)]",
            "text-[var(--widget-ai-text,#111827)]",
            "[--tw-prose-body:var(--widget-ai-text,#111827)]",
            "[--tw-prose-headings:var(--widget-ai-text,#111827)]",
            "[--tw-prose-links:var(--widget-primary,#3B82F6)]"
          )}
        >
          <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1">
              ▋
            </span>
          )}

          {showFeedbackButton && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => onFeedbackClick(message.id)}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  "opacity-60 hover:opacity-100",
                  "hover:bg-black/5"
                )}
                title={t("feedback.buttonTitle")}
              >
                <MessageSquare size={16} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end mb-4">
      <div
        className={cn(
          "max-w-[85%] rounded-2xl rounded-br-md px-4 py-3",
          // CSS Custom Properties - User nutzt primary als Fallback
          "bg-[var(--widget-user-bg,var(--widget-primary,#3B82F6))]",
          "text-[var(--widget-user-text,#FFFFFF)]"
        )}
      >
        <p className="whitespace-pre-wrap break-words text-sm">
          {message.content}
        </p>
      </div>
    </div>
  );
}
