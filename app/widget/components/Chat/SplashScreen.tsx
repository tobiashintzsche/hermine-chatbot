"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../../lib/utils";

interface SplashScreenProps {
  welcomeMessage?: string;
  prompts: string[];
  onPromptClick: (prompt: string) => void;
}

export function SplashScreen({
  welcomeMessage,
  prompts,
  onPromptClick,
}: SplashScreenProps) {
  const filteredPrompts = prompts.filter((prompt) => !!prompt);

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      {welcomeMessage && (
        <div
          className={cn(
            "prose prose-sm max-w-none text-center mb-6",
            "[--tw-prose-links:var(--widget-primary,#3B82F6)]"
          )}
        >
          <Markdown remarkPlugins={[remarkGfm]}>{welcomeMessage}</Markdown>
        </div>
      )}

      {filteredPrompts.length > 0 && (
        <div className="flex flex-col gap-2 w-full max-w-sm">
          {filteredPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onPromptClick(prompt)}
              className={cn(
                "w-full px-4 py-3 text-sm text-left",
                "rounded-xl border border-gray-200",
                "bg-white transition-colors duration-200",
                "hover:bg-gray-50 hover:border-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-gray-200"
              )}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
