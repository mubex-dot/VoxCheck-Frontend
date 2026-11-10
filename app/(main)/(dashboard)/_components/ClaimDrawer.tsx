import { ClaimRead } from "@/types/claim.types";
import { X, Play, Copy, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import StatusBadge from "./StatusBadge";

const ClaimDrawer = ({
  claim,
  onClose,
  onOverride,
}: {
  claim: ClaimRead;
  onClose: () => void;
  onOverride: (status: string) => void;
}) => {
  const [showToast, setShowToast] = useState(false);
  const [overrideStatus, setOverrideStatus] = useState("");

  const handleOverride = (status: string) => {
    setOverrideStatus(status);
    setShowToast(true);
    onOverride(status);
    // Auto hide toast after 5s
    setTimeout(() => setShowToast(false), 5000);
  };

  const jsonString = JSON.stringify(claim.vcon, null, 2);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-ink/10 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-180 rounded-l-drawer bg-surface shadow-drawer flex flex-col">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 pb-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <StatusBadge status={claim.status} />
            <button
              onClick={onClose}
              className="p-1 hover:bg-surface-sunken rounded-md text-ink-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-[26px] leading-8 font-bold text-ink mb-2">
            {claim.vcon.analysis[0]?.body}
          </h2>
          <div className="flex items-center gap-2 text-caption text-ink-muted mb-8">
            <span>2 min ago</span>
            <span>·</span>
            <span>voice note · {claim.vcon.dialog[0]?.duration}</span>
            <span>·</span>
            <span>Party #{claim.vcon.parties[0]?.hashed_whatsapp}</span>
          </div>

          {/* Normalized Claim */}
          <div className="mb-6">
            <h3 className="text-label text-ink-faint uppercase mb-2">
              Claim (normalized)
            </h3>
            <p className="text-bodyLg text-ink font-medium">
              {claim.vcon.analysis[0]?.body}
            </p>
          </div>

          {/* Fake Audio Player */}
          <div className="flex items-center gap-4 mb-8">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-colors">
              <Play className="w-4 h-4 ml-1" fill="currentColor" />
            </button>
            <div className="flex-1 flex items-center gap-1 h-10">
              {/* Fake Waveform */}
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full bg-line-strong ${i % 3 === 0 ? "h-6" : i % 2 === 0 ? "h-8" : "h-4"}`}
                />
              ))}
            </div>
            <span className="text-caption text-ink-muted font-mono">
              0:00/{claim.vcon.dialog[0]?.duration}
            </span>
            <span className="text-caption text-ink-muted font-mono">1x</span>
          </div>

          {/* Transcript */}
          <div className="mb-8">
            <h3 className="text-label text-ink-faint uppercase mb-3">
              Transcript
            </h3>
            <div className="rounded-badge bg-surface-sunken p-4 text-bodyLg text-ink">
              <p className="italic text-ink-muted mb-2">
                &quot;Abeg, listen to this update.
              </p>
              <p className="border-l-2 border-primary pl-3">
                {claim.vcon.analysis[0]?.body}&quot;
              </p>
            </div>
          </div>

          {/* Evidence */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-label text-ink-faint uppercase">Evidence</h3>
              <div className="flex items-center gap-2">
                <div className="h-1 w-24 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(claim.vcon.analysis[0]?.confidence || 0) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-caption text-ink-muted">
                  {Math.round((claim.vcon.analysis[0]?.confidence || 0) * 100)}%
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {["inecnigeria.org", "punchng.com", "factcheckhub.com"].map(
                (domain) => (
                  <div
                    key={domain}
                    className="flex items-center justify-between py-2 border-b border-line"
                  >
                    <div>
                      <p className="text-ui text-ink font-medium">{domain}</p>
                      <p className="text-caption text-ink-muted">
                        Official election schedule · primary-source example
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-ink-muted" />
                  </div>
                ),
              )}
            </div>
            <p className="text-[11px] text-ink-faint mt-2">
              Illustrative evidence only; no live sources retrieved or verified.
            </p>
          </div>

          {/* AI Reasoning */}
          <div className="mb-8">
            <h3 className="text-label text-ink-faint uppercase mb-2">
              AI Reasoning
            </h3>
            <p className="text-body text-ink-muted">
              In this example, the referenced schedule does not support a
              postponement. The voice note provides no dated announcement to
              substantiate its claim.
            </p>
          </div>

          {/* vCON */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-label text-ink-faint uppercase">vCON</h3>
              <button className="flex items-center gap-1.5 text-caption text-ink-muted hover:text-ink transition-colors">
                <Copy className="w-3.5 h-3.5" /> Copy JSON
              </button>
            </div>
            <div className="rounded-badge bg-surface-sunken p-4 font-mono text-mono overflow-x-auto whitespace-pre text-ink">
              {jsonString}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-6 border-t border-line bg-surface rounded-bl-drawer">
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => handleOverride("True")}
              className="flex-1 h-10 rounded-badge border border-line bg-surface text-ui font-medium text-ink hover:border-line-strong transition-colors"
            >
              Approve verdict
            </button>
            <button
              onClick={() => handleOverride("False")}
              className="flex-1 h-10 rounded-badge border border-line bg-surface text-ui font-medium text-ink hover:border-line-strong transition-colors"
            >
              Mark as false
            </button>
            <button
              onClick={() => handleOverride("Unverified")}
              className="flex-1 h-10 rounded-badge border border-line bg-surface text-ui font-medium text-ink hover:border-line-strong transition-colors"
            >
              Mark unverified
            </button>
          </div>
          <button className="text-caption text-ink-muted hover:text-ink transition-colors">
            + Add a note...
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 text-ui shadow-drawer animate-in slide-in-from-bottom-5">
          <div className="w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="w-3 h-3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-ink font-medium">
            Verdict updated to {overrideStatus}
          </span>
          <button
            onClick={() => setShowToast(false)}
            className="ml-4 text-caption text-ink-muted font-bold hover:text-ink"
          >
            Undo
          </button>
        </div>
      )}
    </>
  );
};

export default ClaimDrawer;
