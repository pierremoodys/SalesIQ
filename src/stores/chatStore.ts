import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the structure of page context data (moved from ChatContext)
interface PageContext {
  page?: string;
  companiesCount?: number;
  [key: string]: unknown; // Allow additional properties
}

interface ChatState {
  isChatOpen: boolean;
  chatPanelSize: number; // Percentage of the screen width

  // Business Logic State (from ChatContext)
  isChatAvailable: boolean;
  pageContext: PageContext | null;

  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  setChatPanelSize: (size: number) => void;

  // Business Logic Actions (from ChatContext)
  setChatAvailable: (available: boolean, context?: PageContext) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      isChatOpen: false,
      chatPanelSize: 35, // Default to ~530px on a 1440px screen (530/1440 ≈ 37%, but accounting for left nav, ~35% works)

      // Business Logic State
      isChatAvailable: false,
      pageContext: null,

      toggleChat: () => {
        const { isChatAvailable } = get();
        if (isChatAvailable) {
          set((state) => ({ isChatOpen: !state.isChatOpen }));
        }
      },
      openChat: () => {
        const { isChatAvailable } = get();
        if (isChatAvailable) {
          set({ isChatOpen: true });
        }
      },
      closeChat: () => set({ isChatOpen: false }),
      setChatPanelSize: (size: number) => set({ chatPanelSize: size }),

      // Business Logic Actions (from ChatContext)
      setChatAvailable: (available: boolean, context?: PageContext) => {
        set((state) => {
          const newState: Partial<ChatState> = {
            isChatAvailable: available,
          };

          // Close chat if becoming unavailable
          if (!available) {
            newState.isChatOpen = false;
          }

          // Update context if provided and different
          const newContext = context || null;
          if (
            JSON.stringify(state.pageContext) !== JSON.stringify(newContext)
          ) {
            newState.pageContext = newContext;
          }

          return newState;
        });
      },
    }),
    {
      name: "companies-chat-storage", // Storage key
      partialize: (state) => ({
        isChatOpen: state.isChatOpen,
        chatPanelSize: state.chatPanelSize,
        // Note: We don't persist isChatAvailable or pageContext
        // as they should be set fresh on each page load
      }), // Only persist these values
    }
  )
);

// Export the PageContext type for use in other files
export type { PageContext };
