"use client";

import type { Message } from "../../../types";
import { MessageBubble } from "./MessageBubble";
import { LoadingDots } from "../../common/LoadingDots";
import { cn } from "../../../lib/utils";

interface MessageListProps {
  messages: Message[];
  conversationId: string | null;
  isLoading: boolean;
  isInitializing: boolean;
  isStreaming: boolean;
  streamingMessageId: string | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  endRef: React.RefObject<HTMLDivElement | null>;
  onFeedbackClick: (messageId: string) => void;
}

export function MessageList({
  messages,
  conversationId,
  isLoading,
  isInitializing,
  isStreaming,
  streamingMessageId,
  containerRef,
  endRef,
  onFeedbackClick,
}: MessageListProps) {
  return (
    <div
      ref={containerRef}
      className={cn(
        "flex-1 overflow-y-auto p-4",
        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      )}
    >
      {isInitializing && (
        <div className="flex justify-center mt-10">
          <LoadingDots />
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          conversationId={conversationId || undefined}
          onFeedbackClick={onFeedbackClick}
          isStreaming={isStreaming && streamingMessageId === message.id}
        />
      ))}

      {isLoading && !isStreaming && (
        <div className="flex justify-start mb-4">
          <div className="rounded-2xl rounded-bl-md px-4 py-3 bg-[var(--widget-ai-bg,#F3F4F6)]">
            <LoadingDots />
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}
