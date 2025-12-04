import type {
  ISettings,
  Position,
  Spacing,
  ChatSettings,
  FloatingButtonSettings,
  LayoutSettings,
  FeatureSettings,
  FallbackIcon,
  Shadow,
} from "./settings";

export const DEFAULT_POSITION: Position = "bottom-right";

export const DEFAULT_SPACING: Spacing = {
  top: "16px",
  right: "16px",
  bottom: "16px",
  left: "16px",
};

export const DEFAULT_FALLBACK_ICON: FallbackIcon = "chat";
export const DEFAULT_SHADOW: Shadow = "small";

export const DEFAULT_PRIMARY_COLOR = "#6B7280";
export const DEFAULT_BACKGROUND_COLOR = "#FFFFFF";
export const DEFAULT_FONT_FAMILY = "system-ui, sans-serif";

export const DEFAULT_CHAT_HEADER = {
  title: "Chat",
  titleColor: "#111827",
  subtitle: undefined,
  subtitleColor: "#6B7280",
  description: undefined,
  descriptionColor: "#9CA3AF",
};

export const DEFAULT_CHAT_INPUT = {
  placeholder: "Nachricht eingeben...",
  buttonBackgroundColor: DEFAULT_PRIMARY_COLOR,
};

export const DEFAULT_MESSAGE_STYLES = {
  user: {
    backgroundColor: DEFAULT_PRIMARY_COLOR,
    textColor: "#FFFFFF",
  },
  ai: {
    backgroundColor: "#F3F4F6",
    textColor: "#111827",
  },
};

export const DEFAULT_CHAT_SETTINGS: ChatSettings = {
  header: DEFAULT_CHAT_HEADER,
  input: DEFAULT_CHAT_INPUT,
  messages: DEFAULT_MESSAGE_STYLES,
  primaryColor: DEFAULT_PRIMARY_COLOR,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  fontFamily: DEFAULT_FONT_FAMILY,
  shadow: DEFAULT_SHADOW,
};

export const DEFAULT_FLOATING_BUTTON: FloatingButtonSettings = {
  tooltipText: "Chat öffnen",
  width: 60,
  height: 60,
  backgroundColor: DEFAULT_PRIMARY_COLOR,
  borderColor: undefined,
  iconColor: "#FFFFFF",
  fallbackIcon: DEFAULT_FALLBACK_ICON,
};

export const DEFAULT_LAYOUT: LayoutSettings = {
  position: DEFAULT_POSITION,
  spacing: DEFAULT_SPACING,
};

export const DEFAULT_FEATURES: FeatureSettings = {
  fullScreenEnabled: true,
  titleLinkEnabled: false,
};

export const DEFAULT_API_ENDPOINT = "https://app.hermine.ai";

export const DEFAULTS: Partial<ISettings> = {
  chat: DEFAULT_CHAT_SETTINGS,
  floatingButton: DEFAULT_FLOATING_BUTTON,
  layout: DEFAULT_LAYOUT,
  features: DEFAULT_FEATURES,
};

export function resolveWithDefaults<T extends Record<string, unknown>>(
  value: T | undefined,
  defaults: T
): T {
  if (!value) return defaults;

  const result = { ...defaults };

  for (const key of Object.keys(defaults) as (keyof T)[]) {
    const val = value[key];
    const def = defaults[key];

    if (val === undefined) {
      continue;
    }

    if (
      typeof val === "object" &&
      val !== null &&
      !Array.isArray(val) &&
      typeof def === "object" &&
      def !== null &&
      !Array.isArray(def)
    ) {
      result[key] = resolveWithDefaults(
        val as Record<string, unknown>,
        def as Record<string, unknown>
      ) as T[keyof T];
    } else {
      result[key] = val;
    }
  }

  return result;
}

export function resolveSettings(settings: ISettings): ISettings {
  return {
    ...settings,
    chat: resolveWithDefaults(settings.chat, DEFAULT_CHAT_SETTINGS),
    floatingButton: resolveWithDefaults(
      settings.floatingButton,
      DEFAULT_FLOATING_BUTTON
    ),
    layout: resolveWithDefaults(settings.layout, DEFAULT_LAYOUT),
    features: resolveWithDefaults(settings.features, DEFAULT_FEATURES),
  };
}
