"use client";

import { ChatWidget } from "./widget/ChatWidget";
import type { ISettings } from "./settings";

const demoSettings: ISettings = {
  // Echte Credentials aus der Vorlage (Chieming)
  accountId: "2d0c055a-d91e-45a8-bd09-0270029e8a95",
  agentSlug: "chatbot-gemeinde-copy-209ed7cf-d8a5-4a4c-90b4-10a62b6c4228",
  target: "https://app.hermine.ai",
  chat: {
    header: {
      title: "Hi, ich bin Chiemi",
      titleColor: "#16416e",
      subtitle: "KI Chat der Gemeinde Chieming",
      subtitleColor: "#6B7280",
    },
    primaryColor: "#16416e",
    backgroundColor: "#FFFFFF",
    fontFamily: '"Nunito Sans", sans-serif',
    shadow: "large",
    messages: {
      user: {
        backgroundColor: "#16416e",
        textColor: "#ffffff",
      },
      ai: {
        backgroundColor: "#dae8f5",
        textColor: "#16416e",
      },
    },
    input: {
      buttonBackgroundColor: "#16416e",
    },
  },
  floatingButton: {
    backgroundColor: "#f9fafb",
    iconColor: "#16416e",
    borderColor: "#16416e",
    width: 60,
    height: 60,
    tooltipText: "Chat öffnen",
  },
  layout: {
    position: "bottom-right",
    spacing: {
      bottom: "20px",
      right: "20px",
    },
  },
  features: {
    fullScreenEnabled: true,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Hermine Chat Widget Preview
        </h1>
        <p className="text-gray-600 mb-8">
          Klicke auf den Button unten rechts, um das Chat-Widget zu öffnen.
        </p>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Demo Settings</h2>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(demoSettings, null, 2)}
          </pre>
        </div>
      </main>

      <ChatWidget settings={demoSettings} />
    </div>
  );
}
