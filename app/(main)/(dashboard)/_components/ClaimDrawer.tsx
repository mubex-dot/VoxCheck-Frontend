import { ClaimRead } from "@/types/claim.types";
import { X, Play, Copy, ArrowUpRight, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useReviewClaimMutation } from "@/lib/api/claimsApiSlice";
import { getErrorMessage } from "@/lib/api/error";
import StatusBadge from "./StatusBadge";

const ClaimDrawer = ({
  claim,
  onClose,
  onOverride,
}: {
  claim: ClaimRead;
  onClose: () => void;
  onOverride?: (status: "True" | "False" | "Unverified") => void;
}) => {
  const [showToast, setShowToast] = useState(false);
  const [overrideStatus, setOverrideStatus] = useState("");
  const [reviewClaim, { isLoading }] = useReviewClaimMutation();

  const analysis = claim.vcon.analysis?.[0];
  const claimText =
    analysis?.claim || claim.vcon.dialog?.[0]?.body || "No content";
  const verdict = analysis?.status || "Pending";
  const reporter =
    claim.vcon.parties?.find((p) => p.role === "reporter")?.name || "Unknown";

  const jsonString = JSON.stringify(claim.vcon, null, 2);

  const handleOverride = async (status: "True" | "False" | "Unverified") => {
    try {
      await reviewClaim({
        id: claim.id,
        data: {
          status,
          summary: analysis?.summary || "Manually overridden by reviewer.",
        },
      }).unwrap();

      onOverride?.(status);
      setOverrideStatus(status);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Failed to override:", err);
      alert(getErrorMessage(err, "Failed to override claim"));
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-ink/10 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 z-50 h-full w-180 rounded-l-drawer bg-surface shadow-drawer flex flex-col">
        <div className="flex-1 overflow-y-auto p-8 pb-0">
          <div className="flex items-start justify-between mb-6">
            <StatusBadge status={verdict} />
            <button
              onClick={onClose}
              className="p-1 hover:bg-surface-sunken rounded-md text-ink-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-[26px] leading-8 font-bold text-ink mb-2">
            {claimText}
          </h2>

          <div className="flex items-center gap-2 text-caption text-ink-muted mb-8">
            <span>{new Date(claim.created_at).toLocaleDateString()}</span>
            <span>·</span>
            <span className="capitalize">{claim.message_type} message</span>
            <span>·</span>
            <span>Reporter: {reporter}</span>
          </div>

          <div className="mb-6">
            <h3 className="text-label text-ink-faint uppercase mb-2">
              Claim (normalized)
            </h3>
            <p className="text-bodyLg text-ink font-medium">{claimText}</p>
          </div>

          {/* Media Player / Text Viewer */}
          {claim.message_type === "voice" ? (
            <div className="flex items-center gap-4 mb-8">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-colors">
                <Play className="w-4 h-4 ml-1" fill="currentColor" />
              </button>
              <div className="flex-1 flex items-center gap-1 h-10">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full bg-line-strong ${i % 3 === 0 ? "h-6" : i % 2 === 0 ? "h-8" : "h-4"}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-8 p-4 rounded-badge border border-line bg-surface-sunken flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-ink-muted" />
              <span className="text-body text-ink italic">
                &quot;{claimText}&quot;
              </span>
            </div>
          )}

          {/* Evidence */}
          <div className="mb-8">
            <h3 className="text-label text-ink-faint uppercase mb-3">
              Evidence
            </h3>
            {analysis?.sources && analysis.sources.length > 0 ? (
              <div className="space-y-3">
                {analysis.sources.map((source, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-line"
                  >
                    <p className="text-ui text-ink font-medium">{source}</p>
                    <ArrowUpRight className="w-4 h-4 text-ink-muted" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-body text-ink-muted italic bg-surface-sunken p-3 rounded-badge">
                No sources provided by AI.
              </p>
            )}
          </div>

          {/* AI Reasoning */}
          <div className="mb-8">
            <h3 className="text-label text-ink-faint uppercase mb-2">
              AI Reasoning
            </h3>
            <p className="text-body text-ink-muted">
              {analysis?.summary || "No reasoning provided."}
            </p>
          </div>

          {/* vCON */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-label text-ink-faint uppercase">vCON</h3>
              <button
                onClick={() => navigator.clipboard.writeText(jsonString)}
                className="flex items-center gap-1.5 text-caption text-ink-muted hover:text-ink transition-colors"
              >
                <Copy className="w-3.5 h-3.5" /> Copy JSON
              </button>
            </div>
            <div className="rounded-badge bg-surface-sunken p-4 font-mono text-mono overflow-x-auto whitespace-pre text-ink max-h-64 overflow-y-auto">
              {jsonString}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-6 border-t border-line bg-surface rounded-bl-drawer">
          <div className="flex gap-3 mb-4">
            <button
              disabled={isLoading}
              onClick={() => handleOverride("True")}
              className="flex-1 h-10 rounded-badge border border-line bg-surface text-ui font-medium text-ink hover:border-line-strong transition-colors disabled:opacity-50"
            >
              Approve verdict
            </button>
            <button
              disabled={isLoading}
              onClick={() => handleOverride("False")}
              className="flex-1 h-10 rounded-badge border border-line bg-surface text-ui font-medium text-ink hover:border-line-strong transition-colors disabled:opacity-50"
            >
              Mark as false
            </button>
            <button
              disabled={isLoading}
              onClick={() => handleOverride("Unverified")}
              className="flex-1 h-10 rounded-badge border border-line bg-surface text-ui font-medium text-ink hover:border-line-strong transition-colors disabled:opacity-50"
            >
              Mark unverified
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
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
        </div>
      )}
    </>
  );
};

export default ClaimDrawer;
