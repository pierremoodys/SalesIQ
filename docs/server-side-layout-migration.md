# 🔄 Server-Side Layout Migration Guide

## Overview

This guide explains how to migrate the `/companies` layout from a client-side component to a server-side component while preserving interactive features like chat panels, animations, and resizable layouts.

## 🏗️ Current vs Target Architecture

### Current Architecture (Client-Side)

```typescript
// src/app/(with-sidebar)/companies/layout.tsx
"use client"; // ← Everything renders client-side

export default function CompaniesLayout({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(initialChatOpen); // Client-side state
  const [searchQuery, setSearchQuery] = useState(""); // Local state
  const [isAnimating, setIsAnimating] = useState(false); // Animation state

  return (
    <div>
      <PageHeader onToggleChat={toggleChat} isChatOpen={isChatOpen} />
      <PanelGroup>
        {" "}
        {/* Complex resizable panels */}
        <Panel>{children}</Panel>
        {isChatOpen && (
          <Panel>
            <ChatPanel />
          </Panel>
        )}
      </PanelGroup>
    </div>
  );
}
```

**Issues:**

- ❌ No server-side rendering benefits
- ❌ Larger client bundle
- ❌ Hydration complexity
- ❌ SEO limitations

### Target Architecture (Server-Side)

```typescript
// Server Component Layout
export default async function CompaniesLayout({ children }) {
  const chatState = await getChatState(); // Server-side state

  return (
    <div>
      <PageHeader {...chatState} />
      <CompaniesContentClient searchParams={searchParams}>
        {children}
      </CompaniesContentClient>
    </div>
  );
}
```

**Benefits:**

- ✅ True server-side rendering
- ✅ Smaller client bundle
- ✅ Better SEO
- ✅ Faster initial load

---

## 📋 Migration Steps

### Step 1: Create Server Actions for State Management

Create server actions to handle chat state via cookies:

```typescript
// src/lib/chat-server-actions.ts
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getChatState() {
  const cookieStore = cookies();
  return {
    isChatOpen: cookieStore.get("chatOpen")?.value === "true",
    chatPanelSize: parseInt(cookieStore.get("chatPanelSize")?.value || "35"),
  };
}

export async function toggleChatAction(pathname: string) {
  "use server";
  const cookieStore = cookies();
  const current = cookieStore.get("chatOpen")?.value === "true";

  cookieStore.set("chatOpen", String(!current), {
    httpOnly: false, // Allow client access for animations
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  revalidatePath(pathname);
}

export async function updateChatPanelSize(size: number, pathname: string) {
  "use server";
  const cookieStore = cookies();

  cookieStore.set("chatPanelSize", String(size), {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  revalidatePath(pathname);
}
```

### Step 2: Update PageHeader for Server Actions

Modify the PageHeader component to accept server actions:

```typescript
// src/components/pageHeader/PageHeader.tsx
interface PageHeaderProps {
  // ... existing props
  isChatOpen?: boolean;
  toggleChatAction?: () => void; // Server action
}

export default function PageHeader({
  isChatOpen,
  toggleChatAction,
  // ... other props
}) {
  return (
    <div>
      <h1>{title}</h1>
      {toggleChatAction && (
        <form action={toggleChatAction}>
          <button type="submit">
            {isChatOpen ? "Close Chat" : "Open Chat"}
          </button>
        </form>
      )}
    </div>
  );
}
```

### Step 3: Create Client Component for Interactive Content

Extract interactive features to a separate client component:

```typescript
// src/components/layout/CompaniesContentClient.tsx
"use client";

import { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { updateChatPanelSize } from "@/lib/chat-server-actions";
import { usePathname } from "next/navigation";

interface CompaniesContentClientProps {
  children: React.ReactNode;
  initialChatOpen: boolean;
  initialChatSize: number;
}

export default function CompaniesContentClient({
  children,
  initialChatOpen,
  initialChatSize,
}: CompaniesContentClientProps) {
  const pathname = usePathname();
  const [chatPanelSize, setChatPanelSize] = useState(initialChatSize);
  const [shouldRenderChat, setShouldRenderChat] = useState(initialChatOpen);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync with server state changes
  useEffect(() => {
    if (!isInitialized) {
      setShouldRenderChat(initialChatOpen);
      setIsInitialized(true);
    }
  }, [initialChatOpen, isInitialized]);

  // Handle chat animations (same logic as before)
  useEffect(() => {
    if (!isInitialized) return;

    if (initialChatOpen && !shouldRenderChat) {
      setShouldRenderChat(true);
      setIsAnimating(true);
      setAnimationClass("slide-in-right");

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setAnimationClass("");
      }, 300);

      return () => clearTimeout(timer);
    } else if (!initialChatOpen && shouldRenderChat) {
      setIsAnimating(true);
      setAnimationClass("slide-out-right");

      const timer = setTimeout(() => {
        setShouldRenderChat(false);
        setIsAnimating(false);
        setAnimationClass("");
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [initialChatOpen, shouldRenderChat, isInitialized]);

  const handlePanelResize = async (sizes: number[]) => {
    if (!isAnimating && initialChatOpen && sizes[1]) {
      setChatPanelSize(sizes[1]);
      // Debounced server update
      await updateChatPanelSize(sizes[1], pathname);
    }
  };

  return (
    <div className="flex-1 min-h-0">
      <PanelGroup
        direction="horizontal"
        onLayout={handlePanelResize}
        className="h-full"
      >
        <Panel
          id="companies-content"
          defaultSize={shouldRenderChat ? 100 - chatPanelSize : 100}
          className="min-w-0"
        >
          <div className="h-full overflow-auto">{children}</div>
        </Panel>

        {shouldRenderChat && (
          <>
            <PanelResizeHandle />
            <Panel
              id="companies-chat"
              defaultSize={chatPanelSize}
              minSize={20}
              maxSize={50}
              className={`min-w-0 ${animationClass}`}
            >
              <ChatPanel />
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
}
```

### Step 4: Create Server Component Layout

Transform the layout to a server component:

```typescript
// src/app/(with-sidebar)/companies/layout.tsx
// Remove "use client" directive

import { getChatState, toggleChatAction } from "@/lib/chat-server-actions";
import { PageHeader } from "@/components/pageHeader";
import {
  BuildingOffice2Icon,
  PlusIcon,
  DocumentArrowDownIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import CompaniesContentClient from "@/components/layout/CompaniesContentClient";
import { CompaniesContext } from "@/contexts/CompaniesContext";

interface CompaniesLayoutProps {
  children: React.ReactNode;
}

export default async function CompaniesLayout({
  children,
}: CompaniesLayoutProps) {
  // Get chat state from server
  const { isChatOpen, chatPanelSize } = await getChatState();

  // Create bound server action
  const boundToggleChatAction = toggleChatAction.bind(null, "/companies");

  const menuItems = [
    {
      id: "add-company",
      label: "Add Company",
      icon: PlusIcon,
      onClick: () => console.log("Add company"),
    },
    {
      id: "export-data",
      label: "Export Data",
      icon: DocumentArrowDownIcon,
      onClick: () => console.log("Export data"),
    },
    {
      id: "company-settings",
      label: "Company Settings",
      icon: CogIcon,
      onClick: () => console.log("Open settings"),
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Server-rendered header */}
      <div className="flex-shrink-0">
        <PageHeader
          variant="simple"
          icon={BuildingOffice2Icon}
          title="Your companies"
          isChatOpen={isChatOpen}
          toggleChatAction={boundToggleChatAction}
          chatConfig={{
            title: "Add or edit companies",
            description:
              "Tell me about the size, industry, location of the companies you want to start tracking.",
            placeholder: "Search for companies",
            icon: PlusIcon,
          }}
          menuItems={menuItems}
        />
      </div>

      {/* Client-side interactive content */}
      <CompaniesContentClient
        initialChatOpen={isChatOpen}
        initialChatSize={chatPanelSize}
      >
        {children}
      </CompaniesContentClient>
    </div>
  );
}
```

### Step 5: Handle Search and View Type State

For search and view type, you have options:

#### Option A: URL-based State (Recommended)

```typescript
// Use searchParams for search and view state
export default async function CompaniesLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { search?: string; view?: string };
}) {
  const searchQuery = searchParams.search || "";
  const viewType = searchParams.view || "list";

  return (
    <CompaniesContentClient
      initialSearchQuery={searchQuery}
      initialViewType={viewType}
      // ... other props
    >
      {children}
    </CompaniesContentClient>
  );
}
```

## 🔄 Context Migration

### Current CompaniesContext

```typescript
// Currently client-side context
const contextValue: CompaniesContextType = {
  searchQuery,
  setSearchQuery,
  viewType,
  setViewType,
};
```

### Migrated Approach

```typescript
// Option 1: URL-based context (server-side)
const contextValue = {
  searchQuery: searchParams.search || "",
  viewType: searchParams.view || "list",
  // Functions that update URL
};

// Option 2: Client-side context for UI state
// Move context provider to CompaniesContentClient
```

---

## ⚖️ Trade-offs and Considerations

### Performance Benefits

- ✅ **Faster initial page load** - Server-rendered HTML
- ✅ **Better SEO** - Content indexable by search engines
- ✅ **Smaller JavaScript bundle** - Less client-side code
- ✅ **Progressive enhancement** - Works without JavaScript

### Implementation Complexity

- ⚠️ **Server Actions learning curve** - New paradigm
- ⚠️ **State synchronization** - Server state → Client animations
- ⚠️ **More files** - Separation of server/client concerns

### User Experience

- ✅ **Chat state persists** across sessions and tabs
- ⚠️ **Slower chat toggle** - Server round-trip vs instant client state
- ✅ **Better perceived performance** - Content visible immediately

---

## 🧪 Testing the Migration

### Before Migration

1. Note current behavior: instant chat toggle, animations, panel resizing
2. Test across different browsers and devices
3. Measure bundle size and load times

### After Migration

1. Verify server-side rendering works (disable JavaScript)
2. Test chat toggle still works (should be slower but functional)
3. Ensure animations still work on client-side
4. Verify state persists across page refreshes
5. Measure improved performance metrics

---

## 🚀 Deployment Checklist

- [ ] Server actions are properly configured
- [ ] Cookie settings are appropriate for your domain
- [ ] Error boundaries handle server action failures
- [ ] Loading states are implemented for server actions
- [ ] Client-side fallbacks work when JavaScript is disabled
- [ ] Performance monitoring is in place

---

## 📚 Additional Resources

- [Next.js Server Actions Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- [Cookie Management in Next.js](https://nextjs.org/docs/app/api-reference/functions/cookies)

---

## 🆘 Common Issues and Solutions

### Issue: "Cannot access cookies in client component"

```typescript
// ❌ Wrong: Trying to access cookies in client component
"use client";
import { cookies } from "next/headers"; // Error!

// ✅ Correct: Pass cookie data from server component
// Server component passes data to client component as props
```

### Issue: "Server action not updating UI"

```typescript
// ✅ Ensure revalidatePath is called
export async function toggleChatAction(pathname: string) {
  "use server";
  // ... update cookies
  revalidatePath(pathname); // ← Don't forget this!
}
```

### Issue: "Animation state out of sync"

```typescript
// ✅ Use useEffect to sync server state with client animations
useEffect(() => {
  // Sync initialChatOpen changes with local animation state
}, [initialChatOpen]);
```
