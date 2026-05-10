import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const SYSTEM_PROMPT = `You are an advanced AI medical assistant and anatomy expert integrated into a futuristic, high-fidelity biological visualization platform. 
Your primary users are medical students, doctors, and biology enthusiasts.
Provide highly accurate, professional, yet easy-to-understand explanations of human anatomy, physiology, and pathology.
Keep your answers concise, structured, and educational. Use markdown formatting.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // Initialize OpenAI inside the handler to prevent build-time errors
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'https://bio-clone.vercel.app', 
        'X-Title': 'Bio Clone AI',
      },
    });

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini', // OpenRouter model format
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({ 
      role: 'assistant', 
      content: response.choices[0].message.content 
    });

  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during your request.' },
      { status: 500 }
    );
  }
}
