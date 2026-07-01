import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Send,
  Mic,
  MicOff,
  Loader2,
  MessageSquare,
  Volume2,
  Trash2,
  Copy,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { useConversation, ConversationProvider } from "@elevenlabs/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";

type ChatMessage = { id: string; role: "user" | "assistant"; content: string; ts: number };

const STORAGE_KEY = "sks_assistant_history_v1";
const SUGGESTIONS = [
  "Summarize Sateesh's career in 3 bullets.",
  "What's his experience with Generative AI?",
  "Which industries has he delivered projects in?",
  "How can I contact Sateesh?",
];

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const loadHistory = (): ChatMessage[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((m) => m && (m.role === "user" || m.role === "assistant"));
  } catch {
    return [];
  }
};

const AssistantPage = () => {
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadHistory());
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Persist history
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50)));
    } catch {
      // ignore quota
    }
  }, [messages]);

  // Autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  // Focus textarea
  useEffect(() => {
    if (mode === "text") textareaRef.current?.focus();
  }, [mode]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;
      setError(null);
      const userMsg: ChatMessage = { id: uid(), role: "user", content: trimmed, ts: Date.now() };
      const assistantId = uid();
      const history = [...messages, userMsg];
      setMessages([
        ...history,
        { id: assistantId, role: "assistant", content: "", ts: Date.now() },
      ]);
      setInput("");
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
        const url = `https://${projectId}.supabase.co/functions/v1/ai-chat`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            secret: import.meta.env.VITE_EDGE_SHARED_SECRET ?? "",
            messages: history.map((m) => ({ role: m.role, content: m.content })),
          }),
          signal: controller.signal,
        });


        if (!res.ok || !res.body) {
          const body = await res.text().catch(() => "");
          if (res.status === 429) throw new Error("Too many requests — please wait a moment.");
          if (res.status === 402) throw new Error("AI quota exceeded. Please try later.");
          throw new Error(body || `Request failed (${res.status})`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let acc = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trim = line.trim();
            if (!trim.startsWith("data:")) continue;
            const data = trim.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                acc += delta;
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m)),
                );
              }
            } catch {
              // ignore non-JSON keepalives
            }
          }
        }

        if (!acc) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: "_(No response — please try rephrasing.)_" }
                : m,
            ),
          );
        }
      } catch (e) {
        if ((e as Error).name === "AbortError") {
          // user cancelled; keep partial content
        } else {
          const msg = e instanceof Error ? e.message : "Something went wrong";
          setError(msg);
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
          toast({ title: "Chat error", description: msg, variant: "destructive" });
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  const stop = () => abortRef.current?.abort();

  const clearHistory = () => {
    setMessages([]);
    setError(null);
  };

  const regenerate = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    // Remove the trailing assistant message (if any) and the last user, then resend.
    const idx = messages.lastIndexOf(lastUser);
    setMessages(messages.slice(0, idx));
    void send(lastUser.content);
  };

  const copyMsg = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => toast({ title: "Copied to clipboard" }),
      () => toast({ title: "Copy failed", variant: "destructive" }),
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  return (
    <>
      <SEO
        title="AI Assistant | Sateesh Kumar Singh"
        description="Chat with Sateesh's AI assistant via text or voice. Ask about his experience, skills, projects, and how to get in touch."
        path="/assistant"
      />

      <section className="section-container py-10 md:py-16">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            AI Assistant
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Chat with <span className="gradient-text">SKS Assistant</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Ask anything about Sateesh's background, projects, or skills — by text or voice.
          </p>
        </header>

        {/* Mode switcher */}
        <div className="flex justify-center mb-6" role="tablist" aria-label="Assistant mode">
          <div className="inline-flex p-1 rounded-xl bg-secondary/60 border border-border">
            <button
              role="tab"
              aria-selected={mode === "text"}
              onClick={() => setMode("text")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors",
                mode === "text"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <MessageSquare className="w-4 h-4" /> Text
            </button>
            <button
              role="tab"
              aria-selected={mode === "voice"}
              onClick={() => setMode("voice")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors",
                mode === "voice"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Volume2 className="w-4 h-4" /> Voice
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto glass-card overflow-hidden">
          {mode === "text" ? (
            <div className="flex flex-col h-[70vh] min-h-[500px]">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-background/40">
                <span className="text-xs text-muted-foreground">
                  {messages.length === 0
                    ? "Start a new conversation"
                    : `${messages.length} message${messages.length === 1 ? "" : "s"}`}
                </span>
                <div className="flex gap-1">
                  {messages.length > 0 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={regenerate}
                        disabled={streaming}
                        className="h-8 text-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" /> Regenerate
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearHistory}
                        disabled={streaming}
                        className="h-8 text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-6 space-y-5"
                role="log"
                aria-live="polite"
                aria-label="Conversation"
              >
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg mb-2">How can I help?</h2>
                    <p className="text-sm text-muted-foreground mb-6">Try one of these prompts:</p>
                    <div className="grid sm:grid-cols-2 gap-2 max-w-xl mx-auto">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="text-left text-sm px-4 py-3 rounded-xl border border-border bg-background/60 hover:bg-secondary/60 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}
                    >
                      {m.role === "assistant" && (
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                          m.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/60 text-foreground",
                        )}
                      >
                        {m.content ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-pre:my-2 prose-pre:bg-background/60">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <span className="inline-flex gap-1" aria-label="Assistant is thinking">
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce [animation-delay:120ms]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce [animation-delay:240ms]" />
                          </span>
                        )}
                        {m.role === "assistant" && m.content && (
                          <div className="mt-1.5 -mb-1 flex gap-1 opacity-60 hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => copyMsg(m.content)}
                              className="text-[11px] inline-flex items-center gap-1 hover:text-primary"
                              aria-label="Copy message"
                            >
                              <Copy className="w-3 h-3" /> Copy
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 p-3 rounded-lg border border-destructive/30 bg-destructive/10 text-sm text-destructive"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              {/* Composer */}
              <form
                onSubmit={onSubmit}
                className="border-t border-border/60 p-3 bg-background/40"
              >
                <div className="flex items-end gap-2">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Ask about experience, projects, skills…"
                    rows={1}
                    maxLength={2000}
                    className="resize-none min-h-[44px] max-h-32"
                    aria-label="Message"
                  />
                  {streaming ? (
                    <Button type="button" onClick={stop} variant="secondary" aria-label="Stop">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={!input.trim()} aria-label="Send">
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground mt-2 px-1">
                  Press Enter to send · Shift+Enter for newline · Responses are AI-generated.
                </p>
              </form>
            </div>
          ) : (
            <VoicePanel />
          )}
        </div>
      </section>
    </>
  );
};

const VoicePanelInner = () => {
  const [connecting, setConnecting] = useState(false);
  const conversation = useConversation({
    onConnect: () => {
      setConnecting(false);
      toast({ title: "Voice connected" });
    },
    onDisconnect: () => setConnecting(false),
    onError: (e) => {
      console.error("Voice error", e);
      toast({
        title: "Voice assistant error",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
      setConnecting(false);
    },
  });

  const isConnected = conversation.status === "connected";

  const start = useCallback(async () => {
    setConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const { data, error } = await supabase.functions.invoke("elevenlabs-token", {
        body: { secret: import.meta.env.VITE_EDGE_SHARED_SECRET ?? "" },
      });

      if (error || !data?.token) throw new Error("Unable to start voice chat right now.");
      await conversation.startSession({
        conversationToken: data.token,
        connectionType: "webrtc",
      });
    } catch (e) {
      toast({
        title: "Could not start voice chat",
        description:
          e instanceof Error && e.message.toLowerCase().includes("permission")
            ? "Microphone permission is required."
            : "Please check your microphone and try again.",
        variant: "destructive",
      });
      setConnecting(false);
    }
  }, [conversation]);

  const stop = useCallback(() => conversation.endSession(), [conversation]);

  const status = isConnected
    ? conversation.isSpeaking
      ? "Assistant is speaking…"
      : "Listening… speak naturally."
    : connecting
    ? "Connecting…"
    : "Tap the mic to start a voice conversation.";

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 min-h-[500px]">
      <div className="relative mb-8">
        {isConnected && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <span className="absolute -inset-3 rounded-full bg-primary/10 animate-pulse" />
          </>
        )}
        <button
          onClick={isConnected ? stop : start}
          disabled={connecting}
          aria-label={isConnected ? "End voice chat" : "Start voice chat"}
          className={cn(
            "relative h-28 w-28 rounded-full flex items-center justify-center shadow-2xl transition-all",
            isConnected
              ? "bg-destructive text-destructive-foreground"
              : "bg-primary text-primary-foreground hover:scale-105",
            "disabled:opacity-60",
          )}
        >
          {connecting ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : isConnected ? (
            <MicOff className="w-10 h-10" />
          ) : (
            <Mic className="w-10 h-10" />
          )}
        </button>
      </div>
      <h2 className="text-lg font-semibold mb-1">Voice Conversation</h2>
      <p className="text-sm text-muted-foreground max-w-md">{status}</p>
      <p className="text-xs text-muted-foreground mt-6 max-w-md">
        Powered by ElevenLabs. Your microphone is only used while a session is active.
      </p>
    </div>
  );
};

const VoicePanel = () => (
  <ConversationProvider>
    <VoicePanelInner />
  </ConversationProvider>
);

export default AssistantPage;
