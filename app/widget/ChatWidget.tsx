"use client";

import { useState, useRef, useEffect } from "react";
import type { ISettings } from "../settings";
import { resolveSettings } from "../defaults";
import { initI18n } from "./i18n";
import { cn } from "./lib/utils";
import {
  ChatHeader,
  ChatInputForm,
  MessageList,
  FeedbackDialog,
  ErrorBanner,
} from "./components/Chat";
import { FloatingButton } from "./components/FloatingButton";
import { SplashScreen } from "./components/Chat/SplashScreen";
import { ThemeProvider } from "./components/ThemeProvider";
import { useConversation, useTheme } from "./hooks";

initI18n();

const DEFAULT_API_ENDPOINT = "https://app.hermine.ai";

interface ChatWidgetProps {
  settings: ISettings;
  /** Preview mode - starts open and shows in embedded container */
  previewMode?: boolean;
}

export function ChatWidget({
  settings: rawSettings,
  previewMode = false,
}: ChatWidgetProps) {
  const settings = resolveSettings(rawSettings);

  const [isOpen, setIsOpen] = useState(previewMode);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [input, setInput] = useState("");
  const [feedbackMessageId, setFeedbackMessageId] = useState<string | null>(
    null
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { chat, floatingButton, layout, features } = settings;

  // Backend-Integration über useConversation Hook
  const {
    messages,
    conversationId,
    isLoading,
    isInitializing,
    isStreaming,
    streamingMessageId,
    prompts,
    imageUrl,
    error,
    sendMessage,
    clearError,
  } = useConversation({
    accountId: settings.accountId,
    agentSlug: settings.agentSlug,
    apiEndpoint: settings.target || DEFAULT_API_ENDPOINT,
  });

  // Theme laden (für Logo im Header)
  const { logoUrl } = useTheme({
    accountId: settings.accountId,
    agentSlug: settings.agentSlug,
    apiEndpoint: settings.target || DEFAULT_API_ENDPOINT,
  });

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);
  const handleToggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput("");
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const handleFeedbackClick = (messageId: string) => {
    setFeedbackMessageId(messageId);
  };

  const handleFeedbackSubmit = async () => {
    // TODO: Implement feedback submission
    return true;
  };

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Position styles
  const getPositionStyles = (): React.CSSProperties => {
    const spacing = layout?.spacing || {};
    const position = layout?.position || "bottom-right";

    const base: React.CSSProperties = {
      position: "fixed",
      zIndex: 9999,
    };

    switch (position) {
      case "bottom-right":
        return {
          ...base,
          bottom: spacing.bottom || "16px",
          right: spacing.right || "16px",
        };
      case "bottom-left":
        return {
          ...base,
          bottom: spacing.bottom || "16px",
          left: spacing.left || "16px",
        };
      case "top-right":
        return {
          ...base,
          top: spacing.top || "16px",
          right: spacing.right || "16px",
        };
      case "top-left":
        return {
          ...base,
          top: spacing.top || "16px",
          left: spacing.left || "16px",
        };
      default:
        return {
          ...base,
          bottom: spacing.bottom || "16px",
          right: spacing.right || "16px",
        };
    }
  };

  const getShadowClass = () => {
    switch (chat?.shadow) {
      case "none":
        return "";
      case "large":
        return "shadow-2xl";
      default:
        return "shadow-xl";
    }
  };

  return (
    <ThemeProvider
      settings={settings}
      className={cn("hermine-chat-widget", previewMode && "absolute inset-0")}
    >
      {/* Floating Button - always visible */}
      <div
        style={
          previewMode
            ? {
                position: "absolute",
                bottom: "16px",
                right: "16px",
                zIndex: 10,
                width: `${Number(floatingButton?.width || 60)}px`,
                height: `${Number(floatingButton?.height || 60)}px`,
              }
            : getPositionStyles()
        }
      >
        <FloatingButton
          isOpen={isOpen}
          onClick={handleToggle}
          imageUrl={imageUrl}
          imageLoaded={!isInitializing}
          width={floatingButton?.width}
          height={floatingButton?.height}
          tooltipText={floatingButton?.tooltipText}
        />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={
            previewMode
              ? {
                  position: "absolute",
                  bottom: `${Number(floatingButton?.height || 60) + 32}px`,
                  right: "16px",
                  left: "16px",
                  top: "16px",
                }
              : (() => {
                  const baseStyles = getPositionStyles();
                  const buttonHeight = Number(floatingButton?.height || 60);
                  if (baseStyles.bottom) {
                    baseStyles.bottom = `calc(${baseStyles.bottom} + ${buttonHeight}px + 16px)`;
                  }
                  return baseStyles;
                })()
          }
          className={cn(
            "flex flex-col bg-white rounded-xl overflow-hidden",
            getShadowClass(),
            previewMode
              ? ""
              : isFullScreen
              ? "fixed inset-4 w-auto h-auto"
              : "w-[400px] h-[600px] max-h-[80vh]"
          )}
        >
          <ChatHeader
            title={chat?.header?.title}
            titleColor={chat?.header?.titleColor}
            subtitle={chat?.header?.subtitle}
            subtitleColor={chat?.header?.subtitleColor}
            logoUrl={logoUrl}
            showLogo={true}
            isFullScreen={isFullScreen}
            fullScreenEnabled={features?.fullScreenEnabled}
            onToggleFullScreen={handleToggleFullScreen}
            onClose={handleClose}
          />

          {error && <ErrorBanner message={error} onClose={clearError} />}

          {messages.length === 0 && !isInitializing ? (
            <SplashScreen prompts={prompts} onPromptClick={handlePromptClick} />
          ) : (
            <MessageList
              messages={messages}
              conversationId={conversationId}
              isLoading={isLoading}
              isInitializing={isInitializing}
              isStreaming={isStreaming}
              streamingMessageId={streamingMessageId}
              containerRef={containerRef}
              endRef={endRef}
              onFeedbackClick={handleFeedbackClick}
            />
          )}

          <ChatInputForm
            input={input}
            textareaRef={textareaRef}
            placeholder={chat?.input?.placeholder}
            isDisabled={isLoading || isInitializing}
            isSubmitDisabled={!input.trim() || isLoading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      {/* Feedback Dialog */}
      <FeedbackDialog
        isOpen={!!feedbackMessageId}
        onClose={() => setFeedbackMessageId(null)}
        messageId={feedbackMessageId || ""}
        conversationId={conversationId || ""}
        primaryColor={chat?.primaryColor}
        onSubmitFeedback={handleFeedbackSubmit}
      />
    </ThemeProvider>
  );
}
