import type { NextRequest } from "next/server";

const RATE_WINDOW = 60_000;
const RATE_MAX = 5;
const rateMap = new Map<string, { count: number; resetAt: number }>();

const SYSTEM_PROMPT =
  "You are Ask Tay AI, an assistant for Tay Shofer's portfolio. Answer ONLY about: Tay's background (CS graduate, software developer), skills (React, TypeScript, Next.js, Node.js, SQL, C/C++, Framer Motion, Tailwind), projects (Poker Home Games at poker-home-games-three.vercel.app; Orders & Delivery Management), frontend/full-stack engineering, AI-assisted workflows, and career goals (seeking junior software roles). Politely redirect any unrelated questions back to portfolio topics. Be concise — 2-3 sentences max.";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (entry) {
    if (now < entry.resetAt) {
      if (entry.count >= RATE_MAX) {
        return Response.json(
          {
            message:
              "I'm at my limit right now — try again in a moment, or reach Tay directly at tayshofer05@gmail.com.",
          },
          { status: 429 },
        );
      }
      entry.count++;
    } else {
      rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    }
  } else {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
  }

  let messages: Array<{ role: string; content: string }> = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body.messages) ? body.messages.slice(-2) : [];
  } catch {
    return Response.json(
      { message: "Something went wrong. Try again or reach Tay at tayshofer05@gmail.com." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          max_tokens: 150,
          temperature: 0.7,
        }),
      },
    );

    if (res.status === 429) {
      return Response.json(
        {
          message:
            "I'm at my limit right now — try again in a moment, or reach Tay directly at tayshofer05@gmail.com.",
        },
        { status: 200 },
      );
    }

    if (!res.ok) {
      throw new Error(`Groq ${res.status}`);
    }

    const data = await res.json();
    const text: string =
      data?.choices?.[0]?.message?.content?.trim() ??
      "Sorry, I couldn't generate a response. Try again shortly.";

    return Response.json({ message: text });
  } catch {
    return Response.json(
      {
        message:
          "Something went wrong. Try again or reach Tay at tayshofer05@gmail.com.",
      },
      { status: 200 },
    );
  }
}
