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
    // TEMPORARY: Returning dummy response to allow deployment without API keys
    return NextResponse.json({ 
      role: 'assistant', 
      content: "AI Assistant is currently in maintenance mode for deployment. Please configure OPENAI_API_KEY to enable chat." 
    });

    /* 
    // Original logic commented out for deployment stability
    const { messages } = await req.json();
    ...
    */
  } catch (error: any) {
    return NextResponse.json({ error: 'Maintenance Mode' }, { status: 500 });
  }
}
