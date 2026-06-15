import { useCallback, useEffect, useState } from "react";
import { useConversation, ConversationProvider } from "@elevenlabs/react";
import { Mic, MicOff, Settings, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "elevenlabs_agent_id";

const VoiceAssistant = () => {
  const [open, setOpen] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || "";
    setAgentId(saved);
  }, []);

  const conversation = useConversation({
    onConnect: () => toast({ title: "Voice assistant connected" }),
    onDisconnect: () => setConnecting(false),
    onError: (e) => {
      console.error("Voice assistant error", e);
      toast({ title: "Voice assistant error", description: String(e), variant: "destructive" });
      setConnecting(false);
    },
  });

  const isConnected = conversation.status === "connected";

  const start = useCallback(async () => {
    const id = (localStorage.getItem(STORAGE_KEY) || agentId).trim();
    if (!id) {
      setShowSettings(true);
      toast({ title: "Add your ElevenLabs Agent ID to start" });
      return;
    }
    setConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const { data, error } = await supabase.functions.invoke("elevenlabs-token", {
        body: { agentId: id },
      });
      if (error || !data?.token) throw new Error(error?.message || data?.error || "Token error");
      await conversation.startSession({ conversationToken: data.token, connectionType: "webrtc" });
    } catch (e) {
      toast({
        title: "Could not start voice chat",
        description: e instanceof Error ? e.message : "Check mic permission and Agent ID",
        variant: "destructive",
      });
      setConnecting(false);
    }
  }, [agentId, conversation]);

  const stop = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const saveSettings = () => {
    localStorage.setItem(STORAGE_KEY, agentId.trim());
    setShowSettings(false);
    toast({ title: "Saved", description: "Agent ID saved locally." });
  };

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open voice assistant"
          className="fixed bottom-20 right-6 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 hover:scale-105 transition-transform flex items-center justify-center"
        >
          <Mic className="h-6 w-6" aria-hidden="true" />
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Voice assistant"
          className="fixed bottom-20 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] glass-card p-5 shadow-2xl border-primary/30"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Voice Assistant</h3>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => setShowSettings((s) => !s)}
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => {
                  if (isConnected) stop();
                  setOpen(false);
                }}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showSettings ? (
            <div className="space-y-3">
              <div>
                <Label htmlFor="agent-id" className="text-xs">
                  ElevenLabs Agent ID
                </Label>
                <Input
                  id="agent-id"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  placeholder="agent_xxxxxxxx"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Create an agent at elevenlabs.io → Agents, then paste the ID here.
                </p>
              </div>
              <Button onClick={saveSettings} className="w-full" size="sm">
                Save
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs text-muted-foreground">
                {isConnected
                  ? conversation.isSpeaking
                    ? "Assistant is speaking…"
                    : "Listening… speak naturally."
                  : "Tap the mic to start a voice conversation."}
              </div>

              <div className="flex justify-center py-2">
                <button
                  onClick={isConnected ? stop : start}
                  disabled={connecting}
                  aria-label={isConnected ? "Stop voice chat" : "Start voice chat"}
                  className={`relative h-20 w-20 rounded-full flex items-center justify-center transition-all ${
                    isConnected
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-primary text-primary-foreground hover:scale-105"
                  } disabled:opacity-60`}
                >
                  {isConnected && (
                    <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" aria-hidden="true" />
                  )}
                  {connecting ? (
                    <Loader2 className="h-7 w-7 animate-spin" />
                  ) : isConnected ? (
                    <MicOff className="h-7 w-7" />
                  ) : (
                    <Mic className="h-7 w-7" />
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-muted-foreground">
                Powered by ElevenLabs Conversational AI
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
