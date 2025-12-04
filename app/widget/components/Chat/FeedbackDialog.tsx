"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string;
  conversationId: string;
  primaryColor?: string;
  onSubmitFeedback: (
    messageId: string,
    conversationId: string,
    feedback: string
  ) => Promise<boolean>;
}

export function FeedbackDialog({
  isOpen,
  onClose,
  messageId,
  conversationId,
  primaryColor = "#6B7280",
  onSubmitFeedback,
}: FeedbackDialogProps) {
  const { t } = useTranslation();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (comment.trim() && !isSubmitting) {
      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        const success = await onSubmitFeedback(
          messageId,
          conversationId,
          comment
        );
        if (success) {
          setSubmitStatus("success");
          setComment("");
          setTimeout(() => {
            onClose();
            setSubmitStatus("idle");
          }, 4000);
        } else {
          setSubmitStatus("error");
        }
      } catch (error) {
        console.error("Feedback submission error:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleOverlayClick = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[10000]",
        "flex items-center justify-center",
        "bg-black/50 backdrop-blur-sm"
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          "bg-white rounded-xl shadow-2xl",
          "w-full max-w-md mx-4",
          "border-t-4"
        )}
        style={{ borderTopColor: primaryColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <span
            className="text-lg font-semibold"
            style={{ color: primaryColor }}
          >
            {t("feedback.title")}
          </span>
          <button
            className={cn(
              "p-1 rounded text-2xl leading-none text-gray-400",
              "transition-colors hover:bg-gray-100 hover:text-gray-600"
            )}
            onClick={onClose}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-3xl text-green-600">✓</span>
              </div>
              <p className="text-lg font-medium text-gray-900">
                {t("feedback.successTitle")}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {t("feedback.successMessage")}
              </p>
            </div>
          ) : submitStatus === "error" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-3xl text-red-600">⚠</span>
              </div>
              <p className="text-lg font-medium text-gray-900">
                {t("feedback.errorTitle")}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {t("feedback.errorMessage")}
              </p>
              <button
                className={cn(
                  "mt-4 px-6 py-2 rounded-lg text-white",
                  "transition-colors hover:opacity-90"
                )}
                style={{ backgroundColor: primaryColor }}
                onClick={() => setSubmitStatus("idle")}
              >
                {t("feedback.retry")}
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">
                {t("feedback.question")}
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("feedback.placeholder")}
                disabled={isSubmitting}
                rows={4}
                className={cn(
                  "w-full rounded-lg border border-gray-300",
                  "px-4 py-3 text-sm resize-none",
                  "focus:outline-none focus:ring-2 focus:ring-gray-300",
                  "disabled:bg-gray-50 disabled:cursor-not-allowed"
                )}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm",
                    "border border-gray-300 text-gray-700",
                    "transition-colors hover:bg-gray-50",
                    "disabled:opacity-50"
                  )}
                >
                  {t("feedback.cancel")}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !comment.trim()}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm text-white",
                    "transition-colors hover:opacity-90",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  style={{ backgroundColor: primaryColor }}
                >
                  {isSubmitting
                    ? t("feedback.submitting")
                    : t("feedback.submit")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
