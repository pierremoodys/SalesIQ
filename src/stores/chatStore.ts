import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatState {
  isChatOpen: boolean;
  chatPanelSize: number; // Percentage of the screen width
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  setChatPanelSize: (size: number) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      isChatOpen: false,
      chatPanelSize: 35, // Default to ~530px on a 1440px screen (530/1440 ≈ 37%, but accounting for left nav, ~35% works)

      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
      openChat: () => set({ isChatOpen: true }),
      closeChat: () => set({ isChatOpen: false }),
      setChatPanelSize: (size: number) => set({ chatPanelSize: size }),
    }),
    {
      name: "companies-chat-storage", // Storage key
      partialize: (state) => ({
        isChatOpen: state.isChatOpen,
        chatPanelSize: state.chatPanelSize,
      }), // Only persist these values
    }
  )
);
