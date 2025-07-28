# AI Chat Integration - Implementation Guide

## 🎯 Overview

This document outlines the steps to implement a context-aware AI chat system that integrates with page-specific data. The chat will be scoped to only work with data available on each page (e.g., companies page can only manage companies from the JSON file).

## 📋 Implementation Roadmap

### Phase 1: Setup & Configuration

#### ✅ Task 1: Install Dependencies

```bash
npm install @google/generative-ai
npm install @types/uuid uuid
```

#### ✅ Task 2: Get Google Gemini API Key (FREE)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the API key
5. Add to `.env.local`:
   ```
   GOOGLE_GEMINI_API_KEY=your_api_key_here
   ```

#### ✅ Task 3: Create Chat Context System

- **File**: `src/types/chat.ts`
- **Purpose**: Define interfaces for page contexts and chat functions
- **Content**:

  ```typescript
  interface PageContext {
    page: "companies" | "notifications" | "upload";
    availableActions: string[];
    data: any;
    systemPrompt: string;
  }

  interface ChatFunction {
    name: string;
    description: string;
    parameters: Record<string, any>;
  }
  ```

#### ✅ Task 4: Create Chat Context Hook

- **File**: `src/hooks/useChatContext.ts`
- **Purpose**: Manage context-aware chat state per page
- **Features**:
  - Page-specific function definitions
  - Data scope limitation
  - System prompt generation

### Phase 2: Core Chat Infrastructure

#### ✅ Task 5: Create Gemini API Client

- **File**: `src/lib/gemini.ts`
- **Purpose**: Handle Google Gemini API integration
- **Features**:
  - Function calling setup
  - Response parsing
  - Error handling

#### ✅ Task 6: Create Base Chat Components

- **File**: `src/components/chat/ChatMessage.tsx`
- **Purpose**: Display individual chat messages
- **Features**:
  - User/AI message types
  - System action messages
  - Typing indicators

#### ✅ Task 7: Create Chat Input Component

- **File**: `src/components/chat/ChatInput.tsx`
- **Purpose**: Handle user input and message sending
- **Features**:
  - Text input with send button
  - Loading states
  - Character limits

#### ✅ Task 8: Create Chat Panel Component

- **File**: `src/components/chat/ChatPanel.tsx`
- **Purpose**: Main chat interface container
- **Features**:
  - Message history
  - Sliding panel animation
  - Context display

### Phase 3: Company-Specific Integration

#### ✅ Task 9: Define Company Functions

- **File**: `src/lib/chat/companyFunctions.ts`
- **Purpose**: Company management functions for AI
- **Functions**:
  - `add_company_to_tracking`
  - `remove_company_from_tracking`
  - `suggest_similar_companies`
  - `search_existing_companies`
  - `filter_companies_by_industry`

#### ✅ Task 10: Create Company Chat Context

- **File**: `src/hooks/useCompanyChatContext.ts`
- **Purpose**: Companies page specific chat context
- **Features**:
  - Load current companies data
  - Define company-specific system prompt
  - Limit AI knowledge to JSON data only

#### ✅ Task 11: Implement Company Function Handlers

- **File**: `src/lib/chat/companyHandlers.ts`
- **Purpose**: Execute company management actions
- **Integration**:
  - Use existing `updateCompanyTracking` API
  - Trigger existing confirmation modals
  - Update company list in real-time

#### ✅ Task 12: Add Chat to Companies Page

- **File**: `src/app/companies/page.tsx`
- **Changes**:
  - Add chat panel integration
  - Connect to company data
  - Handle real-time updates

### Phase 4: UI/UX Integration

#### ✅ Task 13: Create Chat Toggle Button

- **File**: `src/components/ui/ChatToggleButton.tsx`
- **Purpose**: Floating button to open/close chat
- **Features**:
  - Fixed positioning
  - Animation states
  - Unread message indicator

#### ✅ Task 14: Update Layout Component

- **File**: `src/components/layout/Layout.tsx`
- **Changes**:
  - Add chat panel overlay
  - Handle chat state management
  - Responsive design considerations

#### ✅ Task 15: Style Chat Components

- **Files**: All chat components
- **Purpose**: Match existing design system
- **Features**:
  - GT America fonts
  - Consistent color palette
  - Mobile responsiveness
  - Smooth animations

### Phase 5: Advanced Features

#### ✅ Task 16: Add Chat History Persistence

- **File**: `src/lib/chat/chatStorage.ts`
- **Purpose**: Save chat history locally
- **Features**:
  - localStorage integration
  - Session management
  - History cleanup

#### ✅ Task 17: Implement Smart Suggestions

- **File**: `src/lib/chat/companySuggestions.ts`
- **Purpose**: Generate intelligent company suggestions
- **Logic**:
  - Analyze existing company patterns
  - Industry-based recommendations
  - Size/location-based suggestions

#### ✅ Task 18: Add Error Handling & Fallbacks

- **Files**: All chat components
- **Purpose**: Graceful error handling
- **Features**:
  - API failure fallbacks
  - Retry mechanisms
  - User-friendly error messages

#### ✅ Task 19: Add Loading & Animation States

- **Files**: Chat components
- **Purpose**: Smooth user experience
- **Features**:
  - Message loading animations
  - Typing indicators
  - Smooth panel transitions

### Phase 6: Testing & Optimization

#### ✅ Task 20: Add TypeScript Types

- **File**: `src/types/chat.ts` (expand)
- **Purpose**: Complete type safety
- **Coverage**:
  - All function parameters
  - Message types
  - API responses

#### ✅ Task 21: Test Company Integrations

- **Purpose**: Verify all functions work correctly
- **Test Cases**:
  - Add company flow
  - Remove company with confirmation
  - Search functionality
  - Suggestion generation

#### ✅ Task 22: Performance Optimization

- **Purpose**: Optimize for production
- **Tasks**:
  - Message pagination
  - API response caching
  - Component memoization

#### ✅ Task 23: Add Documentation

- **File**: `docs/chat-usage.md`
- **Purpose**: User and developer documentation
- **Content**:
  - How to use the chat
  - Available commands
  - Troubleshooting guide

## 🔧 Technical Specifications

### API Integration

- **Provider**: Google Gemini (Free tier)
- **Rate Limits**: 15 requests/minute, 1,500/day
- **Model**: gemini-pro (function calling supported)

### Data Scope

- **Companies Page**: Only companies from `data/companies.json`
- **Future Pages**: Scoped to page-specific data
- **No External Data**: AI cannot access external databases

### Function Calling Schema

```typescript
const companyFunctions = [
  {
    name: "add_company_to_tracking",
    description:
      "Add a company to the tracking list based on similarity to existing companies",
    parameters: {
      type: "object",
      properties: {
        companyName: { type: "string" },
        industry: { type: "string" },
        reason: { type: "string" },
      },
    },
  },
  // ... more functions
];
```

### System Prompt Template

```
You are a company tracking assistant for this specific user's company list.

AVAILABLE COMPANIES DATA:
{companiesJSON}

CURRENT TRACKED COMPANIES:
{trackedCompanies}

RESTRICTIONS:
- Only suggest companies similar to those in the available data
- Only remove companies that exist in the current tracked list
- Base all suggestions on patterns from the provided data
- Cannot access external company databases
- Must explain reasoning based on existing data patterns

AVAILABLE FUNCTIONS: {functionList}
```

## 🚀 Getting Started

1. **Start with Phase 1** - Setup and configuration
2. **Focus on Task 2** - Get the free Google Gemini API key
3. **Build incrementally** - Complete each phase before moving to the next
4. **Test frequently** - Verify each component works before building on it

## 📝 Notes

- Keep AI responses scoped to available data only
- Use existing company management APIs where possible
- Maintain consistency with current design system
- Plan for future page integrations (notifications, upload)

## 🎯 Example Chat Interactions

### Adding Companies

```
User: "Add some renewable energy companies"
AI: "I'll add renewable energy companies similar to your existing ones.
     Based on Volt Motors (solar technology), I suggest:
     - Tesla (electric vehicles + solar)
     - FirstSolar (solar panels)
     Would you like me to add these?"
```

### Removing Companies

```
User: "Remove companies founded before 2020"
AI: "I found companies founded before 2020:
     - Volt Motors (2015)
     - Gamma Solutions (2018)
     Should I remove these from your tracking list?"
```

### Smart Suggestions

```
User: "What biotech companies should I track?"
AI: "Based on Delta Innovations (biotechnology) in your list,
     I suggest similar biotech companies in your region or
     with similar focus areas. What specific biotech sector
     interests you most?"
```

---

**Created**: For SalesIQ project AI chat integration
**Status**: Ready for implementation
**Estimated Time**: 2-3 weeks for full implementation
