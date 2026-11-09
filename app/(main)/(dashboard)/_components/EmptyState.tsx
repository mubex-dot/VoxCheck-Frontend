import { AudioLines } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-32 text-center">
      {/* Icon */}
      <div className="w-12 h-16 border-2 border-primary rounded-lg flex items-center justify-center mb-6">
        <div className="w-4 h-4 border border-primary rounded-sm" />
      </div>

      <h2 className="text-2xl font-bold text-ink max-w-md">
        No claims yet. Forward a voice note to start.
      </h2>
      <p className="text-body text-ink-muted max-w-lg mt-3">
        Send a WhatsApp voice note to the VoxCheck desk. Its transcript,
        evidence and verdict will appear here for review.
      </p>

      <div className="flex items-center gap-2 mt-8 text-caption text-ink-muted">
        <AudioLines className="w-4 h-4 text-primary" />
        <span>Voice notes · Hashed sender identities</span>
      </div>
    </div>
  );
};

export default EmptyState;
