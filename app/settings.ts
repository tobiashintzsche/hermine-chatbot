import { z } from "zod/v4";

// Zod Schemas
export const PositionSchema = z.enum([
  "bottom-right",
  "bottom-left",
  "top-right",
  "top-left",
  "center-right",
  "center-left",
]);

export const SpacingSchema = z.object({
  top: z.string().optional(),
  right: z.string().optional(),
  bottom: z.string().optional(),
  left: z.string().optional(),
});

export const ChatHeaderSettingsSchema = z.object({
  title: z.string().optional(),
  titleColor: z.string().optional(),
  subtitle: z.string().optional(),
  subtitleColor: z.string().optional(),
  description: z.string().optional(),
  descriptionColor: z.string().optional(),
});

export const ChatInputSettingsSchema = z.object({
  placeholder: z.string().optional(),
  buttonBackgroundColor: z.string().optional(),
});

export const MessageStyleSettingsSchema = z.object({
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
});

export const ChatMessagesSettingsSchema = z.object({
  user: MessageStyleSettingsSchema.optional(),
  ai: MessageStyleSettingsSchema.optional(),
});

export const ShadowSchema = z.enum(["none", "small", "large"]);

export const ChatSettingsSchema = z.object({
  header: ChatHeaderSettingsSchema.optional(),
  input: ChatInputSettingsSchema.optional(),
  messages: ChatMessagesSettingsSchema.optional(),
  primaryColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  fontFamily: z.string().optional(),
  shadow: ShadowSchema.optional(),
});

export const FallbackIconSchema = z.enum(["chat", "robot"]);

export const FloatingButtonSettingsSchema = z.object({
  tooltipText: z.string().optional(),
  width: z.union([z.number(), z.string()]).optional(),
  height: z.union([z.number(), z.string()]).optional(),
  backgroundColor: z.string().optional(),
  borderColor: z.string().optional(),
  iconColor: z.string().optional(),
  fallbackIcon: FallbackIconSchema.optional(),
});

export const LayoutSettingsSchema = z.object({
  position: PositionSchema.optional(),
  spacing: SpacingSchema.optional(),
});

export const FeatureSettingsSchema = z.object({
  fullScreenEnabled: z.boolean().optional(),
  titleLinkEnabled: z.boolean().optional(),
});

export const SettingsSchema = z.object({
  agentSlug: z.string(),
  accountId: z.string(),
  target: z.string().optional(),
  chat: ChatSettingsSchema.optional(),
  floatingButton: FloatingButtonSettingsSchema.optional(),
  layout: LayoutSettingsSchema.optional(),
  features: FeatureSettingsSchema.optional(),
});

// Inferred Types (exported as interfaces)
export type Position = z.infer<typeof PositionSchema>;
export type Spacing = z.infer<typeof SpacingSchema>;
export type ChatHeaderSettings = z.infer<typeof ChatHeaderSettingsSchema>;
export type ChatInputSettings = z.infer<typeof ChatInputSettingsSchema>;
export type MessageStyleSettings = z.infer<typeof MessageStyleSettingsSchema>;
export type ChatMessagesSettings = z.infer<typeof ChatMessagesSettingsSchema>;
export type Shadow = z.infer<typeof ShadowSchema>;
export type ChatSettings = z.infer<typeof ChatSettingsSchema>;
export type FallbackIcon = z.infer<typeof FallbackIconSchema>;
export type FloatingButtonSettings = z.infer<
  typeof FloatingButtonSettingsSchema
>;
export type LayoutSettings = z.infer<typeof LayoutSettingsSchema>;
export type FeatureSettings = z.infer<typeof FeatureSettingsSchema>;
export type ISettings = z.infer<typeof SettingsSchema>;
