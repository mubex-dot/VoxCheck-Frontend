import { ClaimRead } from "@/types/claim.types";
import { AudioLines, MessageSquare } from "lucide-react";
import StatusBadge from "./StatusBadge";

function timeAgo(dateString: string) {
  const minutes = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 60000,
  );
  if (minutes < 60) return `${minutes} min ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

const ClaimsTable = ({
  claims,
  onSelectClaim,
  selectedId,
}: {
  claims: ClaimRead[];
  onSelectClaim: (claim: ClaimRead) => void;
  selectedId?: string;
}) => {
  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-line">
            <th className="py-3 px-4 text-label text-ink-faint uppercase font-semibold w-32">
              Verdict
            </th>
            <th className="py-3 px-4 text-label text-ink-faint uppercase font-semibold">
              Claim
            </th>
            <th className="py-3 px-4 text-label text-ink-faint uppercase font-semibold w-48">
              Source
            </th>
            <th className="py-3 px-4 text-label text-ink-faint uppercase font-semibold w-32">
              Received
            </th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => {
            const analysis = claim.vcon.analysis?.[0];
            const claimText =
              analysis?.claim || claim.vcon.dialog?.[0]?.body || "No content";
            const verdict = analysis?.status || "Pending";
            console.log(verdict);

            return (
              <tr
                key={claim.id}
                onClick={() => onSelectClaim(claim)}
                className={`h-14 border-b border-line cursor-pointer transition-colors ${
                  selectedId === claim.id
                    ? "border-l-[3px] border-l-primary bg-accent/40"
                    : "hover:bg-accent/40 border-l-[3px] border-l-transparent"
                }`}
              >
                <td className="py-2 px-4">
                  <StatusBadge status={verdict} />
                </td>
                <td className="py-2 px-4">
                  <span className="text-body text-ink font-medium line-clamp-1">
                    {claimText}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2 text-ui text-ink-muted">
                    {claim.message_type === "voice" ? (
                      <>
                        <AudioLines className="w-4 h-4" />
                        Voice note
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        Text message
                      </>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4">
                  <span className="text-ui text-ink-muted">
                    {timeAgo(claim.created_at)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimsTable;
