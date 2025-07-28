"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";

// Define the structure of page context data
interface PageContext {
  page?: string;
  companiesCount?: number;
  [key: string]: unknown; // Allow additional properties
}

interface ChatContextType {
  isChatOpen: boolean;
  isChatAvailable: boolean;
  pageContext: PageContext | null;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  setChatAvailable: (available: boolean, context?: PageContext) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatAvailable, setIsChatAvailable] = useState(false);
  const [pageContext, setPageContext] = useState<PageContext | null>(null);
  const previousContext = useRef<PageContext | null>(null);

  const openChat = useCallback(() => {
    if (isChatAvailable) {
      setIsChatOpen(true);
    }
  }, [isChatAvailable]);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    if (isChatAvailable) {
      setIsChatOpen(!isChatOpen);
    }
  }, [isChatAvailable, isChatOpen]);

  const setChatAvailable = useCallback(
    (available: boolean, context?: PageContext) => {
      // Only update if availability actually changed
      setIsChatAvailable((prev) => {
        if (prev !== available) {
          if (!available) {
            setIsChatOpen(false);
          }
          return available;
        }
        return prev;
      });

      // Only update context if it actually changed
      const newContext = context || null;
      if (
        JSON.stringify(previousContext.current) !== JSON.stringify(newContext)
      ) {
        previousContext.current = newContext;
        setPageContext(newContext);
      }
    },
    []
  );

  const value: ChatContextType = useMemo(
    () => ({
      isChatOpen,
      isChatAvailable,
      pageContext,
      openChat,
      closeChat,
      toggleChat,
      setChatAvailable,
    }),
    [
      isChatOpen,
      isChatAvailable,
      pageContext,
      openChat,
      closeChat,
      toggleChat,
      setChatAvailable,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
