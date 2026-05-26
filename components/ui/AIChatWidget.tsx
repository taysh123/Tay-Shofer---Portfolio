"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAccessibility } from "@/components/providers/AccessibilityProvider";
import { ChatIcon, SendIcon, XIcon } from "@/components/ui/icons";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  typing?: boolean;
};

type HistoryItem = { role: "user" | "assistant"; content: string };

let msgId = 0;
const nextId = () => String(++msgId);

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId(),
      role: "assistant",
      text: "Hi! I'm Ask Tay AI. Ask me anything about Tay's background, projects, or skills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { reducedMotion } = useAccessibility();
  const prefersReduced = useReducedMotion();
  const noAnim = reducedMotion || prefersReduced;
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HistoryItem[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  function simulateTyping(answer: string) {
    setIsTyping(true);
    const id = nextId();

    if (noAnim) {
      setMessages((prev) => [...prev, { id, role: "assistant", text: answer }]);
      setIsTyping(false);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id, role: "assistant", text: "", typing: true },
    ]);

    let i = 0;
    const timer = setInterval(() => {
      i++;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, text: answer.slice(0, i), typing: i < answer.length }
            : m,
        ),
      );
      if (i >= answer.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 14);
  }

  async function send() {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput("");

    setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);
    historyRef.current = [...historyRef.current, { role: "user", content: text }];

    // Show typing dots while waiting
    const placeholderId = nextId();
    setIsTyping(true);
    setMessages((prev) => [
      ...prev,
      { id: placeholderId, role: "assistant", text: "", typing: true },
    ]);

    let answer =
      "Something went wrong. Try again or reach Tay at tayshofer05@gmail.com.";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyRef.current.slice(-2) }),
      });
      const data = await res.json();
      if (data?.message) answer = data.message;
    } catch {
      // answer stays as fallback
    }

    // Remove the placeholder dot animation, then type the response
    setMessages((prev) => prev.filter((m) => m.id !== placeholderId));
    historyRef.current = [
      ...historyRef.current,
      { role: "assistant", content: answer },
    ];

    if (noAnim) {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", text: answer },
      ]);
      setIsTyping(false);
    } else {
      const id = nextId();
      setMessages((prev) => [
        ...prev,
        { id, role: "assistant", text: "", typing: true },
      ]);

      let i = 0;
      const timer = setInterval(() => {
        i++;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id
              ? { ...m, text: answer.slice(0, i), typing: i < answer.length }
              : m,
          ),
        );
        if (i >= answer.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 14);
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={noAnim ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={noAnim ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-bg-elevated/98 shadow-2xl backdrop-blur-xl"
            style={{ height: "min(480px, calc(100dvh - 120px))" }}
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#5b8def] to-[#b47cff]"
                >
                  <ChatIcon size={13} className="text-white" />
                  <span
                    className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-bg-elevated bg-emerald-400"
                    style={
                      noAnim
                        ? undefined
                        : { animation: "glow-pulse 2s ease-in-out infinite" }
                    }
                  />
                </span>
                <div>
                  <p className="text-sm font-medium text-fg">Ask Tay AI</p>
                  <p className="text-[0.65rem] text-fg-subtle">Always online</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-fg-muted transition-colors hover:text-fg"
              >
                <XIcon size={13} />
              </button>
            </header>

            {/* Messages */}
            <div
              ref={scrollRef}
              aria-live="polite"
              aria-label="Chat messages"
              className="flex-1 overflow-y-auto space-y-3 px-4 py-4"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={[
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-[#b47cff]/20 text-fg"
                        : "bg-white/[0.06] text-fg-muted",
                    ].join(" ")}
                  >
                    {msg.text || (
                      <span className="flex gap-1 items-center h-4">
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full bg-fg-subtle"
                          style={{ animation: "chat-blink 1.2s ease-in-out 0s infinite" }}
                        />
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full bg-fg-subtle"
                          style={{ animation: "chat-blink 1.2s ease-in-out 0.2s infinite" }}
                        />
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full bg-fg-subtle"
                          style={{ animation: "chat-blink 1.2s ease-in-out 0.4s infinite" }}
                        />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 py-2 transition-colors focus-within:border-white/20">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything…"
                  aria-label="Chat input"
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-sm text-fg placeholder:text-fg-subtle focus:outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#b47cff]/20 text-[#b47cff] transition-colors hover:bg-[#b47cff]/30 disabled:opacity-40"
                >
                  <SendIcon size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open Ask Tay AI chat"}
        aria-expanded={open}
        className="relative inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-[#5b8def] to-[#b47cff] shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b47cff] focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={noAnim ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={noAnim ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="absolute"
            >
              <XIcon size={20} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={noAnim ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={noAnim ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="absolute"
            >
              <ChatIcon size={20} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
