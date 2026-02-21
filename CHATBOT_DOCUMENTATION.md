# Kodbank AI Chatbot - Technical Documentation

## Overview

This document describes the AI chatbot integration in Kodbank, which uses Hugging Face's OpenAI-compatible Router API to provide an intelligent banking assistant named "Kody".

## Architecture

### Backend (API Layer)

**Location:** `src/app/api/chat/route.ts`

**Purpose:** Serverless API endpoint that handles chat requests and communicates with Hugging Face's API.

**Key Features:**
- RESTful API endpoint at `/api/chat`
- Accepts POST requests with user messages
- Forwards requests to Hugging Face Router API
- Returns AI-generated responses
- Handles errors gracefully
- Maintains conversation context

**API Specification:**

```typescript
// Request
POST /api/chat
Content-Type: application/json

{
  "message": "string (required)",
  "conversationHistory": [
    {
      "role": "user" | "assistant",
      "content": "string"
    }
  ]
}

// Success Response (200)
{
  "success": true,
  "message": "string",
  "timestamp": "ISO 8601 string"
}

// Error Response (4xx/5xx)
{
  "error": "string",
  "details": "string (optional)"
}
```

**Error Handling:**
- 400: Invalid input (empty message)
- 401: Invalid HF_TOKEN
- 429: Rate limit exceeded
- 500: Missing HF_TOKEN or API failure

### Frontend (UI Layer)

**Location:** `src/app/chat/page.tsx`

**Purpose:** Interactive chat interface with cyberpunk/hacker aesthetic.

**Key Features:**
- Real-time chat interface
- Typing animation for AI responses
- Message history
- Animated background particles
- Terminal-style chat bubbles
- Responsive design
- Back navigation to dashboard

**UI Components:**
1. **Header**: Shows chatbot status and back button
2. **Message Area**: Scrollable chat history
3. **Input Area**: Text input and send button
4. **Animations**: Sparkles, typing indicators, smooth transitions

### Integration

**Model Details:**
- Provider: Hugging Face Router API
- Base URL: `https://router.huggingface.co/v1`
- Model: `mistralai/Mistral-7B-Instruct-v0.2:together`
- SDK: OpenAI SDK (compatible)

**Authentication:**
- Environment variable: `HF_TOKEN`
- Value: Your Hugging Face API token
- Never hardcoded in source code

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

The `openai` package is required for Hugging Face API communication.

### 2. Configure Environment Variables

Add to `.env.local`:

```env
HF_TOKEN=your_huggingface_token_here
```

### 3. Run the Application

```bash
npm run dev
```

### 4. Access the Chatbot

1. Navigate to the dashboard
2. Click "Chat with Kody" in the sidebar
3. Start chatting!

## API Usage Examples

### Example 1: Simple Question

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is my account balance?"
  }'
```

### Example 2: With Conversation History

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Can you explain that in simpler terms?",
    "conversationHistory": [
      {
        "role": "user",
        "content": "What is compound interest?"
      },
      {
        "role": "assistant",
        "content": "Compound interest is interest calculated on..."
      }
    ]
  }'
```

### Example 3: From Another Application

```javascript
// Node.js example
const response = await fetch('https://your-app.vercel.app/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'How do I transfer money?',
  }),
});

const data = await response.json();
console.log(data.message);
```

## System Prompt

The chatbot uses the following system prompt:

```
You are Kody, a helpful AI banking assistant for Kodbank. 
You help users with their banking questions, provide financial advice, 
and assist with account-related queries. Be friendly, professional, and concise.
```

## Technical Specifications

### Backend

- **Framework**: Next.js 14 App Router
- **Runtime**: Node.js (serverless)
- **API Type**: REST
- **Response Format**: JSON
- **Max Tokens**: 500
- **Temperature**: 0.7

### Frontend

- **Framework**: React 18 with Next.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Type Safety**: TypeScript

### Security

- API key stored in environment variables
- No client-side exposure of credentials
- Input validation on backend
- Error messages don't expose sensitive info

## Design Patterns

### 1. Separation of Concerns
- Backend handles API communication
- Frontend handles UI/UX
- Clear interface between layers

### 2. Error Handling
- Graceful degradation
- User-friendly error messages
- Detailed logging for debugging

### 3. Modularity
- Reusable API endpoint
- Independent frontend component
- Easy to extend or modify

### 4. Best Practices
- TypeScript for type safety
- Environment-based configuration
- Clean code structure
- Comprehensive error handling

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variable:
   - Key: `HF_TOKEN`
   - Value: Your Hugging Face token
4. Deploy

### Environment Variables Required

```
DATABASE_URL=<your-supabase-url>
JWT_SECRET=<your-jwt-secret>
HF_TOKEN=<your-huggingface-token>
```

## Limitations & Considerations

1. **Rate Limits**: Hugging Face API has rate limits
2. **Response Time**: May vary based on model load
3. **Context Length**: Limited by model's context window
4. **Cost**: Check Hugging Face pricing for production use

## Future Enhancements

1. **Conversation Persistence**: Save chat history to database
2. **User Context**: Include user's account info in prompts
3. **Multi-language Support**: Detect and respond in user's language
4. **Voice Input**: Add speech-to-text capability
5. **Suggested Responses**: Quick reply buttons
6. **File Attachments**: Support document uploads
7. **Analytics**: Track common questions and user satisfaction

## Troubleshooting

### Issue: "HF_TOKEN environment variable is not configured"
**Solution**: Add HF_TOKEN to `.env.local` file

### Issue: "Invalid HF_TOKEN - authentication failed"
**Solution**: Verify token is correct and has proper permissions

### Issue: "Rate limit exceeded"
**Solution**: Wait before making more requests or upgrade API plan

### Issue: Typing animation is slow
**Solution**: Adjust delay in `typeMessage` function (line 30 in chat/page.tsx)

## Testing

### Manual Testing
1. Send various types of messages
2. Test error scenarios (empty input, network failure)
3. Verify conversation context is maintained
4. Check responsive design on different devices

### API Testing
```bash
# Test valid request
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Test empty message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": ""}'
```

## Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during operations
- **Accessibility**: Keyboard navigation support

## Performance

- **Lazy Loading**: Chat page loads on demand
- **Optimistic Updates**: Immediate UI feedback
- **Debouncing**: Prevents spam requests
- **Efficient Rendering**: React optimization techniques

## Conclusion

This chatbot implementation provides a production-ready, modular, and maintainable solution for AI-powered banking assistance. The architecture follows best practices and is suitable for academic and professional use.
