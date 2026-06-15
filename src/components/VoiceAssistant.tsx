import { useCallback, useState } from "react";
import { useConversation, ConversationProvider } from "@elevenlabs/react";
import { Mic, MicOff, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const VoiceAssistantInner = () => {
  const [open, setOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      setConnecting(false);
      toast({ title: "Voice assistant connected" });
    },
    onDisconnect: () => setConnecting(false),
    onError: (e) => {
      console.error("Voice assistant error", e);
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
      const { data, error } = await supabase.functions.invoke("elevenlabs-token");
      if (error || !data?.token) {
        throw new Error("Unable to start voice chat right now.");
      }
      await conversation.startSession({
        conversationToken: data.token,
        connectionType: "webrtc",
      });
    } catch (e) {
      toast({
        title: "Could not start voice chat",
        description:
          e instanceof Error && e.message.includes("Permission")
            ? "Microphone permission is required."
            : "Please check your microphone and try again.",
        variant: "destructive",
      });
      setConnecting(false);
    }
  }, [conversation]);

  const stop = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <>
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
                  <span
                    className="absolute inset-0 rounded-full bg-primary/30 animate-ping"
                    aria-hidden="true"
                  />
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
          </div>
        </div>
      )}
    </>
  );
};

const VoiceAssistant = () => (
  <ConversationProvider>
    <VoiceAssistantInner />
  </ConversationProvider>
);

export default VoiceAssistant;
