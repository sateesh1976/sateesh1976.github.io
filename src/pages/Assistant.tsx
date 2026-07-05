import { Sparkles } from "lucide-react";
import SEO from "@/components/SEO";

// Register the ElevenLabs custom element for TypeScript/JSX.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "agent-id": string },
        HTMLElement
      >;
    }
  }
}

const AGENT_ID = "agent_9401kws2dgkffg5980r6wfwpwa3j";

const AssistantPage = () => {
  return (
    <>
      <SEO
        title="AI Assistant | Sateesh Kumar Singh"
        description="Chat with Sateesh's AI assistant. Ask about his experience, skills, projects, and how to get in touch."
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
            Ask anything about Sateesh's background, projects, or skills — powered by ElevenLabs Conversational AI.
          </p>
        </header>

        <div className="max-w-3xl mx-auto glass-card p-4 md:p-8">
          <div
            className="w-full flex items-center justify-center min-h-[500px]"
            aria-label="ElevenLabs conversational AI widget"
          >
            <elevenlabs-convai agent-id={AGENT_ID}></elevenlabs-convai>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-6 max-w-2xl mx-auto text-center">
          Powered by ElevenLabs. Your microphone is only used while a session is active.
        </p>
      </section>
    </>
  );
};

export default AssistantPage;
