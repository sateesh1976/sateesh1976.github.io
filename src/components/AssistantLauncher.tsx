import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

/**
 * Floating launcher for the AI Assistant. Hidden on the assistant page itself.
 */
const AssistantLauncher = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/assistant")) return null;

  return (
    <Link
      to="/assistant"
      aria-label="Open AI Assistant"
      className="fixed bottom-20 right-6 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 hover:scale-105 transition-transform flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Sparkles className="h-6 w-6" aria-hidden="true" />
    </Link>
  );
};

export default AssistantLauncher;
