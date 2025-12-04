"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../../../lib/utils";

export interface FeedbackDialogProps {
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
  primaryColor,
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
      } catch {
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

  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
        onClick={handleDialogClick}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-gray-200"
          style={{ borderColor: primaryColor }}
        >
          <span
            className="font-semibold text-base"
            style={{ color: primaryColor }}
          >
            {t("feedback.title")}
          </span>
          <button
            className={cn(
              "w-8 h-8 flex items-center justify-center",
              "rounded-lg text-gray-500 text-xl leading-none",
              "hover:bg-gray-100 hover:text-gray-700",
              "disabled:opacity-50"
            )}
            onClick={onClose}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <div className="p-4">
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
                ✓
              </div>
              <p className="font-semibold text-gray-900">
                {t("feedback.successTitle")}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {t("feedback.successMessage")}
              </p>
            </div>
          ) : submitStatus === "error" ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl">
                ⚠
              </div>
              <p className="font-semibold text-gray-900">
                {t("feedback.errorTitle")}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {t("feedback.errorMessage")}
              </p>
              <button
                className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:underline"
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
                className={cn(
                  "w-full rounded-lg border border-gray-200",
                  "px-3 py-2 text-sm resize-none",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "disabled:bg-gray-50"
                )}
                placeholder={t("feedback.placeholder")}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                disabled={isSubmitting}
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className={cn(
                    "px-4 py-2 text-sm rounded-lg",
                    "border border-gray-200 text-gray-700",
                    "hover:bg-gray-50",
                    "disabled:opacity-50"
                  )}
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  {t("feedback.cancel")}
                </button>
                <button
                  className={cn(
                    "px-4 py-2 text-sm rounded-lg text-white",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  style={{ backgroundColor: primaryColor || "#3b82f6" }}
                  onClick={handleSubmit}
                  disabled={!comment.trim() || isSubmitting}
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
