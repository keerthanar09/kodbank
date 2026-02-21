import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.HF_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    // Validate HF_TOKEN
    if (!process.env.HF_TOKEN) {
      return NextResponse.json(
        { error: 'HF_TOKEN environment variable is not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message, conversationHistory } = body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Build messages array
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      {
        role: 'system',
        content: 'You are Kody, a helpful AI banking assistant for Kodbank. You help users with their banking questions, provide financial advice, and assist with account-related queries. Be friendly, professional, and concise.',
      },
    ];

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      messages.push(...conversationHistory);
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: message.trim(),
    });

    // Call Hugging Face API
    const completion = await client.chat.completions.create({
      model: 'mistralai/Mistral-7B-Instruct-v0.2:together',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response from AI model' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: assistantMessage,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Chat API error:', error);

    // Handle specific error types
    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid HF_TOKEN - authentication failed' },
        { status: 401 }
      );
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded - please try again later' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process chat request', details: error.message },
      { status: 500 }
    );
  }
}
