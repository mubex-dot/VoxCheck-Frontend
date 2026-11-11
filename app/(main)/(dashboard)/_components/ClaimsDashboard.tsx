"use client";

import { useMemo, useState } from "react";
import {
  AudioLines,
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  Download,
  Search,
} from "lucide-react";
import type { ClaimRead } from "@/types/claim.types";
import { useListClaimsQuery } from "@/lib/api/claimsApiSlice";
import ClaimDrawer from "./ClaimDrawer";
import ClaimsTable from "./ClaimsTable";
import MetricCards from "./MetricCards";

const filters = ["All", "True", "False", "Unverified", "Pending"];

export default function ClaimsDashboard() {
  const [selectedClaim, setSelectedClaim] = useState<ClaimRead | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useListClaimsQuery({
    page,
    page_size: 20,
  });
  const claims = useMemo(() => data?.data?.items ?? [], [data?.data?.items]);
  const totalClaims = data?.data?.total ?? 0;

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const verdict = claim.vcon.analysis?.[0]?.status || "Pending";
      const claimText =
        claim.vcon.analysis?.[0]?.claim || claim.vcon.dialog?.[0]?.body || "";

      const matchesFilter = activeFilter === "All" || verdict === activeFilter;
      const matchesSearch = claimText
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [claims, activeFilter, searchQuery]);

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-[34px] leading-[40px] tracking-[-0.02em] text-ink">
            Claims
          </h1>
          <p className="text-body text-ink-muted mt-1">
            Voice notes forwarded for verification
          </p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-badge border border-line bg-surface text-ui font-medium text-ink hover:border-line-strong transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <MetricCards total={totalClaims} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 mb-4">
        <div className="inline-flex items-center rounded-badge border border-line bg-surface overflow-hidden">
          {filters.map((filter, i) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-ui font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-accent text-primary"
                  : "text-ink-muted hover:bg-surface-sunken hover:text-ink"
              } ${i !== filters.length - 1 ? "border-r border-line" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 h-9 px-3 rounded-badge border border-line bg-surface text-ui text-ink hover:border-line-strong transition-colors">
            <Calendar className="w-4 h-4 text-ink-muted" />
            This Week
            <ChevronDown className="w-3.5 h-3.5 text-ink-muted" />
          </button>
          <div className="relative w-full sm:w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search claims..."
              className="h-9 w-full rounded-badge border border-line bg-surface pl-9 pr-3 text-ui text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full border-t border-line">
        {isLoading ? (
          <div className="py-20 flex justify-center text-ink-muted animate-pulse">
            Loading claims...
          </div>
        ) : isError ? (
          <div className="py-20 flex justify-center text-alert">
            Failed to load claims.
          </div>
        ) : filteredClaims.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-16 border-2 border-primary rounded-lg flex items-center justify-center mb-6">
              <div className="w-4 h-4 border border-primary rounded-sm" />
            </div>
            <h2 className="text-2xl font-bold text-ink max-w-md">
              No claims yet.
            </h2>
            <p className="text-body text-ink-muted max-w-lg mt-3">
              Send a WhatsApp voice note to the VoxCheck desk.
            </p>
            <div className="flex items-center gap-2 mt-8 text-caption text-ink-muted">
              <AudioLines className="w-4 h-4 text-primary" />
              <span>Voice notes · Hashed sender identities</span>
            </div>
          </div>
        ) : (
          <ClaimsTable
            claims={filteredClaims}
            onSelectClaim={setSelectedClaim}
            selectedId={selectedClaim?.id}
          />
        )}
      </div>

      <div className="w-full border-t border-line py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-caption text-ink-muted mt-auto">
        <div>
          <span className="block">
            Showing 1–{filteredClaims.length} of {totalClaims}
          </span>
          <span className="block text-ink-faint mt-1">
            Volunteer examples, not factual assertions.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 hover:text-ink transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <button
            disabled={claims.length < 20}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-1 text-ink font-medium hover:text-primary transition-colors disabled:opacity-50"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {selectedClaim && (
        <ClaimDrawer
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
        />
      )}
    </div>
  );
}