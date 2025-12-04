"use client";

import { useState } from "react";
import { ChatWidget } from "../widget/ChatWidget";
import type { ISettings, Position, Shadow, FallbackIcon } from "../settings";
import {
  DEFAULT_CHAT_SETTINGS,
  DEFAULT_FLOATING_BUTTON,
  DEFAULT_LAYOUT,
  DEFAULT_FEATURES,
} from "../defaults";

// Optional Badge Component
function OptionalBadge() {
  return (
    <span className="ml-1 px-1 py-0.5 text-[9px] font-medium bg-gray-100 text-gray-500 rounded">
      optional
    </span>
  );
}

// Color Picker Component
function ColorPicker({
  label,
  value,
  onChange,
  id,
  optional = false,
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
  optional?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 ${compact ? "flex-1 min-w-0" : ""}`}>
      <label
        htmlFor={id}
        className={`text-[11px] font-medium text-gray-600 ${compact ? "min-w-[60px]" : "min-w-20"} flex items-center`}
      >
        {label}
        {optional && <OptionalBadge />}
      </label>
      <div className="flex items-center gap-1">
        <input
          type="color"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-6 h-6 rounded cursor-pointer border border-gray-200 hover:border-gray-400 transition-colors"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-[70px] px-1.5 py-0.5 text-[11px] border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        />
      </div>
    </div>
  );
}

// Text Input Component
function TextInput({
  label,
  value,
  onChange,
  placeholder,
  id,
  optional = false,
  inline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id: string;
  optional?: boolean;
  inline?: boolean;
}) {
  if (inline) {
    return (
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <label htmlFor={id} className="text-[11px] font-medium text-gray-600 min-w-[60px] flex items-center shrink-0">
          {label}
          {optional && <OptionalBadge />}
        </label>
        <input
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-2 py-1 text-[11px] border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        />
      </div>
    );
  }
  return (
    <div className="space-y-0.5">
      <label htmlFor={id} className="text-[11px] font-medium text-gray-600 flex items-center">
        {label}
        {optional && <OptionalBadge />}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-2 py-1.5 text-[11px] border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
      />
    </div>
  );
}

// Number Input Component
function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  id,
  optional = false,
  unit = "",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  id: string;
  optional?: boolean;
  unit?: string;
}) {
  return (
    <div className="flex items-center gap-2 flex-1">
      <label
        htmlFor={id}
        className="text-[11px] font-medium text-gray-600 min-w-[50px] flex items-center"
      >
        {label}
        {optional && <OptionalBadge />}
      </label>
      <div className="flex items-center gap-1">
        <input
          type="number"
          id={id}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          className="w-16 px-2 py-1 text-[11px] border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        />
        {unit && <span className="text-[10px] text-gray-400">{unit}</span>}
      </div>
    </div>
  );
}

// Select Component
function Select<T extends string>({
  label,
  value,
  onChange,
  options,
  id,
  optional = false,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  id: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 flex-1">
      <label
        htmlFor={id}
        className="text-[11px] font-medium text-gray-600 min-w-[60px] flex items-center"
      >
        {label}
        {optional && <OptionalBadge />}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="flex-1 px-2 py-1 text-[11px] border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Toggle Component
function Toggle({
  label,
  value,
  onChange,
  id,
  optional = false,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  id: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        id={id}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors shrink-0 ${
          value ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform shadow-sm ${
            value ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </button>
      <label
        htmlFor={id}
        className="text-[11px] font-medium text-gray-600 cursor-pointer flex items-center"
        onClick={() => onChange(!value)}
      >
        {label}
        {optional && <OptionalBadge />}
      </label>
    </div>
  );
}

// Row Component for side-by-side layout
function Row({ children, cols = 2 }: { children: React.ReactNode; cols?: 2 | 3 | 4 }) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };
  return <div className={`grid ${gridCols[cols]} gap-2`}>{children}</div>;
}

// Subsection Label
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider pt-1 pb-0.5 border-b border-gray-100">
      {children}
    </div>
  );
}

// Section Component
function Section({
  title,
  children,
  defaultOpen = false,
  badge,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-linear-to-r from-gray-50 to-white flex items-center justify-between hover:from-gray-100 hover:to-gray-50 transition-all"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-xs text-gray-800">{title}</span>
          {badge && (
            <span className="px-1.5 py-0.5 text-[9px] font-medium bg-blue-100 text-blue-600 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="p-2.5 space-y-2 bg-white">{children}</div>}
    </div>
  );
}

export default function ConfigurePage() {
  // Base settings state
  const [accountId, setAccountId] = useState(
    "2d0c055a-d91e-45a8-bd09-0270029e8a95"
  );
  const [agentSlug, setAgentSlug] = useState(
    "chatbot-gemeinde-copy-209ed7cf-d8a5-4a4c-90b4-10a62b6c4228"
  );
  const [target, setTarget] = useState("https://app.hermine.ai");

  // Chat Header settings
  const [headerTitle, setHeaderTitle] = useState(
    DEFAULT_CHAT_SETTINGS.header?.title || "Chat"
  );
  const [headerTitleColor, setHeaderTitleColor] = useState(
    DEFAULT_CHAT_SETTINGS.header?.titleColor || "#111827"
  );
  const [headerSubtitle, setHeaderSubtitle] = useState(
    DEFAULT_CHAT_SETTINGS.header?.subtitle || ""
  );
  const [headerSubtitleColor, setHeaderSubtitleColor] = useState(
    DEFAULT_CHAT_SETTINGS.header?.subtitleColor || "#6B7280"
  );
  const [headerDescription, setHeaderDescription] = useState(
    DEFAULT_CHAT_SETTINGS.header?.description || ""
  );
  const [headerDescriptionColor, setHeaderDescriptionColor] = useState(
    DEFAULT_CHAT_SETTINGS.header?.descriptionColor || "#9CA3AF"
  );

  // Chat general settings
  const [primaryColor, setPrimaryColor] = useState(
    DEFAULT_CHAT_SETTINGS.primaryColor || "#6B7280"
  );
  const [backgroundColor, setBackgroundColor] = useState(
    DEFAULT_CHAT_SETTINGS.backgroundColor || "#FFFFFF"
  );
  const [fontFamily, setFontFamily] = useState(
    DEFAULT_CHAT_SETTINGS.fontFamily || "system-ui, sans-serif"
  );
  const [shadow, setShadow] = useState<Shadow>(
    DEFAULT_CHAT_SETTINGS.shadow || "small"
  );

  // Chat Input settings
  const [inputPlaceholder, setInputPlaceholder] = useState(
    DEFAULT_CHAT_SETTINGS.input?.placeholder || "Nachricht eingeben..."
  );
  const [inputButtonBgColor, setInputButtonBgColor] = useState(
    DEFAULT_CHAT_SETTINGS.input?.buttonBackgroundColor || "#6B7280"
  );

  // Message styles - User
  const [userMessageBgColor, setUserMessageBgColor] = useState(
    DEFAULT_CHAT_SETTINGS.messages?.user?.backgroundColor || "#6B7280"
  );
  const [userMessageTextColor, setUserMessageTextColor] = useState(
    DEFAULT_CHAT_SETTINGS.messages?.user?.textColor || "#FFFFFF"
  );

  // Message styles - AI
  const [aiMessageBgColor, setAiMessageBgColor] = useState(
    DEFAULT_CHAT_SETTINGS.messages?.ai?.backgroundColor || "#F3F4F6"
  );
  const [aiMessageTextColor, setAiMessageTextColor] = useState(
    DEFAULT_CHAT_SETTINGS.messages?.ai?.textColor || "#111827"
  );

  // Floating Button settings
  const [buttonTooltip, setButtonTooltip] = useState(
    DEFAULT_FLOATING_BUTTON.tooltipText || "Chat öffnen"
  );
  const [buttonWidth, setButtonWidth] = useState(
    Number(DEFAULT_FLOATING_BUTTON.width) || 60
  );
  const [buttonHeight, setButtonHeight] = useState(
    Number(DEFAULT_FLOATING_BUTTON.height) || 60
  );
  const [buttonBgColor, setButtonBgColor] = useState(
    DEFAULT_FLOATING_BUTTON.backgroundColor || "#6B7280"
  );
  const [buttonBorderColor, setButtonBorderColor] = useState(
    DEFAULT_FLOATING_BUTTON.borderColor || ""
  );
  const [buttonIconColor, setButtonIconColor] = useState(
    DEFAULT_FLOATING_BUTTON.iconColor || "#FFFFFF"
  );
  const [buttonFallbackIcon, setButtonFallbackIcon] = useState<FallbackIcon>(
    DEFAULT_FLOATING_BUTTON.fallbackIcon || "chat"
  );

  // Layout settings
  const [position, setPosition] = useState<Position>(
    DEFAULT_LAYOUT.position || "bottom-right"
  );
  const [spacingTop, setSpacingTop] = useState(
    DEFAULT_LAYOUT.spacing?.top || "16px"
  );
  const [spacingRight, setSpacingRight] = useState(
    DEFAULT_LAYOUT.spacing?.right || "16px"
  );
  const [spacingBottom, setSpacingBottom] = useState(
    DEFAULT_LAYOUT.spacing?.bottom || "16px"
  );
  const [spacingLeft, setSpacingLeft] = useState(
    DEFAULT_LAYOUT.spacing?.left || "16px"
  );

  // Feature settings
  const [fullScreenEnabled, setFullScreenEnabled] = useState(
    DEFAULT_FEATURES.fullScreenEnabled ?? true
  );
  const [titleLinkEnabled, setTitleLinkEnabled] = useState(
    DEFAULT_FEATURES.titleLinkEnabled ?? false
  );

  // Build settings object
  const settings: ISettings = {
    accountId,
    agentSlug,
    target,
    chat: {
      header: {
        title: headerTitle,
        titleColor: headerTitleColor,
        subtitle: headerSubtitle || undefined,
        subtitleColor: headerSubtitleColor,
        description: headerDescription || undefined,
        descriptionColor: headerDescriptionColor,
      },
      primaryColor,
      backgroundColor,
      fontFamily,
      shadow,
      input: {
        placeholder: inputPlaceholder,
        buttonBackgroundColor: inputButtonBgColor,
      },
      messages: {
        user: {
          backgroundColor: userMessageBgColor,
          textColor: userMessageTextColor,
        },
        ai: {
          backgroundColor: aiMessageBgColor,
          textColor: aiMessageTextColor,
        },
      },
    },
    floatingButton: {
      tooltipText: buttonTooltip,
      width: buttonWidth,
      height: buttonHeight,
      backgroundColor: buttonBgColor,
      borderColor: buttonBorderColor || undefined,
      iconColor: buttonIconColor,
      fallbackIcon: buttonFallbackIcon,
    },
    layout: {
      position,
      spacing: {
        top: spacingTop,
        right: spacingRight,
        bottom: spacingBottom,
        left: spacingLeft,
      },
    },
    features: {
      fullScreenEnabled,
      titleLinkEnabled,
    },
  };

  const [showCode, setShowCode] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Left Panel - Configuration (50%) */}
      <div className="w-1/2 overflow-y-auto p-4 border-r border-gray-200 bg-white">
        <div className="mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🎨</span>
            <h1 className="text-base font-bold text-gray-900">
              Chat Widget Configurator
            </h1>
          </div>
          <p className="text-[11px] text-gray-500 ml-7">
            Konfiguriere dein Widget in Echtzeit • <span className="text-blue-600">Optionale</span> Felder sind markiert
          </p>
        </div>

        <form className="space-y-2">
          {/* API Settings */}
          <Section title="🔑 API Einstellungen" defaultOpen={true} badge="Pflicht">
            <TextInput
              id="accountId"
              label="Account ID"
              value={accountId}
              onChange={setAccountId}
              placeholder="Account ID"
            />
            <TextInput
              id="agentSlug"
              label="Agent Slug"
              value={agentSlug}
              onChange={setAgentSlug}
              placeholder="Agent Slug"
            />
            <TextInput
              id="target"
              label="API Target"
              value={target}
              onChange={setTarget}
              placeholder="https://app.hermine.ai"
              optional
            />
          </Section>

          {/* Chat Header */}
          <Section title="📝 Chat Header">
            <Row>
              <TextInput
                id="headerTitle"
                label="Titel"
                value={headerTitle}
                onChange={setHeaderTitle}
                placeholder="Chat"
                inline
              />
              <ColorPicker
                id="headerTitleColor"
                label="Farbe"
                value={headerTitleColor}
                onChange={setHeaderTitleColor}
                compact
              />
            </Row>
            <Row>
              <TextInput
                id="headerSubtitle"
                label="Untertitel"
                value={headerSubtitle}
                onChange={setHeaderSubtitle}
                placeholder="Optional"
                optional
                inline
              />
              <ColorPicker
                id="headerSubtitleColor"
                label="Farbe"
                value={headerSubtitleColor}
                onChange={setHeaderSubtitleColor}
                optional
                compact
              />
            </Row>
            <Row>
              <TextInput
                id="headerDescription"
                label="Beschreibung"
                value={headerDescription}
                onChange={setHeaderDescription}
                placeholder="Optional"
                optional
                inline
              />
              <ColorPicker
                id="headerDescriptionColor"
                label="Farbe"
                value={headerDescriptionColor}
                onChange={setHeaderDescriptionColor}
                optional
                compact
              />
            </Row>
          </Section>

          {/* Chat Allgemein */}
          <Section title="🎨 Farben & Style">
            <Row>
              <ColorPicker
                id="primaryColor"
                label="Primärfarbe"
                value={primaryColor}
                onChange={setPrimaryColor}
              />
              <ColorPicker
                id="backgroundColor"
                label="Hintergrund"
                value={backgroundColor}
                onChange={setBackgroundColor}
              />
            </Row>
            <Row>
              <Select
                id="shadow"
                label="Schatten"
                value={shadow}
                onChange={setShadow}
                options={[
                  { value: "none", label: "Keiner" },
                  { value: "small", label: "Klein" },
                  { value: "large", label: "Groß" },
                ]}
              />
              <TextInput
                id="fontFamily"
                label="Schriftart"
                value={fontFamily}
                onChange={setFontFamily}
                placeholder="system-ui"
                optional
                inline
              />
            </Row>
          </Section>

          {/* Chat Input */}
          <Section title="⌨️ Eingabefeld">
            <Row>
              <TextInput
                id="inputPlaceholder"
                label="Placeholder"
                value={inputPlaceholder}
                onChange={setInputPlaceholder}
                placeholder="Nachricht eingeben..."
                inline
              />
              <ColorPicker
                id="inputButtonBgColor"
                label="Button"
                value={inputButtonBgColor}
                onChange={setInputButtonBgColor}
                compact
              />
            </Row>
          </Section>

          {/* Messages */}
          <Section title="💬 Nachrichten">
            <SubLabel>Benutzer</SubLabel>
            <Row>
              <ColorPicker
                id="userMessageBgColor"
                label="Hintergrund"
                value={userMessageBgColor}
                onChange={setUserMessageBgColor}
              />
              <ColorPicker
                id="userMessageTextColor"
                label="Text"
                value={userMessageTextColor}
                onChange={setUserMessageTextColor}
              />
            </Row>
            <SubLabel>KI Assistent</SubLabel>
            <Row>
              <ColorPicker
                id="aiMessageBgColor"
                label="Hintergrund"
                value={aiMessageBgColor}
                onChange={setAiMessageBgColor}
              />
              <ColorPicker
                id="aiMessageTextColor"
                label="Text"
                value={aiMessageTextColor}
                onChange={setAiMessageTextColor}
              />
            </Row>
          </Section>

          {/* Floating Button */}
          <Section title="🔘 Floating Button">
            <Row>
              <ColorPicker
                id="buttonBgColor"
                label="Hintergrund"
                value={buttonBgColor}
                onChange={setButtonBgColor}
              />
              <ColorPicker
                id="buttonIconColor"
                label="Icon"
                value={buttonIconColor}
                onChange={setButtonIconColor}
              />
            </Row>
            <Row>
              <ColorPicker
                id="buttonBorderColor"
                label="Rahmen"
                value={buttonBorderColor}
                onChange={setButtonBorderColor}
                optional
              />
              <Select
                id="buttonFallbackIcon"
                label="Icon"
                value={buttonFallbackIcon}
                onChange={setButtonFallbackIcon}
                options={[
                  { value: "chat", label: "💬 Chat" },
                  { value: "robot", label: "🤖 Robot" },
                ]}
                optional
              />
            </Row>
            <Row>
              <NumberInput
                id="buttonWidth"
                label="Breite"
                value={buttonWidth}
                onChange={setButtonWidth}
                min={40}
                max={120}
                unit="px"
              />
              <NumberInput
                id="buttonHeight"
                label="Höhe"
                value={buttonHeight}
                onChange={setButtonHeight}
                min={40}
                max={120}
                unit="px"
              />
            </Row>
            <TextInput
              id="buttonTooltip"
              label="Tooltip"
              value={buttonTooltip}
              onChange={setButtonTooltip}
              placeholder="Chat öffnen"
              optional
            />
          </Section>

          {/* Layout */}
          <Section title="📐 Position & Abstände">
            <Select
              id="position"
              label="Position"
              value={position}
              onChange={setPosition}
              options={[
                { value: "bottom-right", label: "Unten rechts" },
                { value: "bottom-left", label: "Unten links" },
                { value: "top-right", label: "Oben rechts" },
                { value: "top-left", label: "Oben links" },
              ]}
            />
            <SubLabel>Abstände (CSS)</SubLabel>
            <Row cols={4}>
              <TextInput
                id="spacingTop"
                label="Oben"
                value={spacingTop}
                onChange={setSpacingTop}
                placeholder="16px"
                optional
                inline
              />
              <TextInput
                id="spacingRight"
                label="Rechts"
                value={spacingRight}
                onChange={setSpacingRight}
                placeholder="16px"
                optional
                inline
              />
              <TextInput
                id="spacingBottom"
                label="Unten"
                value={spacingBottom}
                onChange={setSpacingBottom}
                placeholder="16px"
                optional
                inline
              />
              <TextInput
                id="spacingLeft"
                label="Links"
                value={spacingLeft}
                onChange={setSpacingLeft}
                placeholder="16px"
                optional
                inline
              />
            </Row>
          </Section>

          {/* Features */}
          <Section title="⚙️ Features">
            <Row>
              <Toggle
                id="fullScreenEnabled"
                label="Vollbild-Modus"
                value={fullScreenEnabled}
                onChange={setFullScreenEnabled}
              />
              <Toggle
                id="titleLinkEnabled"
                label="Titel als Link"
                value={titleLinkEnabled}
                onChange={setTitleLinkEnabled}
                optional
              />
            </Row>
          </Section>
        </form>

        {/* Export Section */}
        <div className="mt-3 p-3 bg-linear-to-r from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">📋</span>
              <h3 className="font-semibold text-xs text-gray-800">Konfiguration exportieren</h3>
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                  showCode 
                    ? "bg-gray-700 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {showCode ? "Verstecken" : "JSON anzeigen"}
              </button>
              <button
                type="button"
                onClick={copyToClipboard}
                className="px-2.5 py-1 text-[11px] font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Kopieren
              </button>
            </div>
          </div>
          {showCode && (
            <pre className="bg-gray-900 text-green-400 p-3 rounded-md text-[10px] overflow-auto max-h-48 font-mono">
              {JSON.stringify(settings, null, 2)}
            </pre>
          )}
        </div>
      </div>

      {/* Right Panel - Live Preview (50%) */}
      <div className="w-1/2 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
        <div className="relative bg-white/30 rounded-2xl border border-gray-300 w-[420px] h-[700px] shadow-xl backdrop-blur-sm">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white rounded-full text-[10px] font-medium text-gray-500 border border-gray-200 shadow-sm">
            Live-Vorschau
          </div>
          <ChatWidget settings={settings} previewMode={true} />
        </div>
      </div>
    </div>
  );
}
