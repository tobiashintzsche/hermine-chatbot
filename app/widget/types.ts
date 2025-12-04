export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isWelcome?: boolean;
  createdAt?: Date;
  conversationId?: string;
  hasErrors?: boolean;
}

export interface ApiMessage {
  id: string;
  message_type: "ai" | "user";
  result: string;
  is_welcome_message?: boolean;
  created_at?: string;
  conversation_id?: string;
  has_errors?: boolean;
}

export interface ApiConfig {
  accountId: string;
  agentSlug: string;
  apiEndpoint: string;
}

export interface Theme {
  ai_icon?: string;
  logo?: string;
  logo_small?: string;
  primary_500?: string;
  primary_900?: string;
  name?: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
  prompts?: string[];
  privacyDisclaimer?: string;
}

export interface CreateConversationResponse {
  conversation_id: string;
}

export interface ConversationResponse {
  id: string;
  messages: ApiMessage[];
  prompts?: string[];
  imageUrl?: string;
  inputPlaceholderDe?: string;
  inputPlaceholderEn?: string;
  privacyDisclaimer?: string;
}

export interface SendMessageResponse {
  status: "ok" | "error";
  message?: string;
}

export type ThemeResponse = Theme;

export function mapApiMessageToMessage(apiMessage: ApiMessage): Message {
  return {
    id: apiMessage.id,
    role: apiMessage.message_type === "ai" ? "assistant" : "user",
    content: apiMessage.result,
    isWelcome: apiMessage.is_welcome_message,
    createdAt: apiMessage.created_at
      ? new Date(apiMessage.created_at)
      : undefined,
    conversationId: apiMessage.conversation_id,
    hasErrors: apiMessage.has_errors,
  };
}
