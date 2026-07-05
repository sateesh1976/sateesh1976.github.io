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
        description="Talk or chat with Sateesh's AI assistant instantly."
        path="/assistant"
      />

      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 md:py-20 bg-gradient-to-b from-background via-background to-muted/30">
        <div className="w-full max-w-2xl mx-auto">
          <header className="text-center mb-8 md:mb-10">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              AI Assistant
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Talk or chat with your AI assistant instantly.
            </p>
          </header>

          <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-xl shadow-primary/5 p-6 md:p-10">
            <div
              className="w-full flex items-center justify-center min-h-[420px] md:min-h-[500px]"
              aria-label="AI assistant widget"
            >
              <elevenlabs-convai agent-id={AGENT_ID}></elevenlabs-convai>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AssistantPage;
