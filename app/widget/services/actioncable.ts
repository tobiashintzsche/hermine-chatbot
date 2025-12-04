import { createConsumer, Consumer, Subscription } from "@rails/actioncable";

const DEFAULT_BASE_URL = "https://hermine.ai";

let consumer: Consumer | null = null;

export function getConsumer(baseUrl: string = DEFAULT_BASE_URL): Consumer {
  if (!consumer) {
    const wsUrl = `${baseUrl.replace("http", "ws")}/cable`;
    consumer = createConsumer(wsUrl);
  }
  return consumer;
}

export interface ChannelCallbacks {
  onReceived: (data: ChatMessage) => void;
  onStream?: (data: StreamMessage) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
  onRejected?: () => void;
}

export interface ChatMessage {
  id: string;
  result: string;
  message_type: "user" | "ai";
  conversation_id: string;
  updated_at?: string;
  has_errors?: boolean;
  is_finished?: boolean;
}

export interface StreamMessage {
  type: "stream";
  message_id: string;
  content: string;
  finished: boolean;
}

export interface ChatSubscription {
  subscription: Subscription;
  unsubscribe: () => void;
}

export function subscribeToConversation(
  conversationId: string,
  callbacks: ChannelCallbacks,
  baseUrl: string = DEFAULT_BASE_URL
): ChatSubscription {
  const currentConsumer = getConsumer(baseUrl);

  const subscription = currentConsumer.subscriptions.create(
    {
      channel: "ChatbotChannel",
      conversation_id: conversationId,
    },
    {
      received(data: ChatMessage | StreamMessage) {
        if ("type" in data && data.type === "stream") {
          callbacks.onStream?.(data as StreamMessage);
        } else {
          callbacks.onReceived(data as ChatMessage);
        }
      },
      connected() {
        callbacks.onConnected?.();
      },
      disconnected() {
        callbacks.onDisconnected?.();
      },
      rejected() {
        callbacks.onRejected?.();
      },
    }
  );

  return {
    subscription,
    unsubscribe: () => {
      subscription.unsubscribe();
    },
  };
}

export function disconnectConsumer(): void {
  if (consumer) {
    consumer.disconnect();
    consumer = null;
  }
}
