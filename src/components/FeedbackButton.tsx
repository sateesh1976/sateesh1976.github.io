import { useEffect, useState } from "react";
import { MessageSquare, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const FEEDBACK_URL =
  "https://livev.app.n8n.cloud/form/16562204-80e8-4ca0-82be-6151a9a49c62";

const FeedbackButton = () => {
  const [open, setOpen] = useState(false);

  // Close modal automatically when the embedded form posts a submission event.
  useEffect(() => {
    if (!open) return;
    const onMessage = (e: MessageEvent) => {
      const data = typeof e.data === "string" ? e.data : e.data?.type || e.data?.event;
      if (
        typeof data === "string" &&
        /submit|submitted|success|complete/i.test(data)
      ) {
        setTimeout(() => setOpen(false), 1200);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Send feedback"
          className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 h-11 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Feedback</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden sm:rounded-xl">
        <DialogHeader className="px-5 pt-5 pb-3 border-b">
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
            Share your feedback
          </DialogTitle>
          <DialogDescription className="flex items-center justify-between gap-3">
            <span>Your thoughts help improve this site.</span>
            <a
              href={FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Open in new tab <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-[70vh] bg-background">
          <iframe
            key={open ? "open" : "closed"}
            src={FEEDBACK_URL}
            title="Feedback form"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackButton;
