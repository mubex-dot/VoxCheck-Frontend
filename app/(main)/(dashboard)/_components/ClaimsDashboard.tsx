"use client";

import { useState } from "react";
import {
  Download,
  Search,
  Calendar,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { ClaimRead } from "@/types/claim.types";
import { mockClaims } from "../_data/mockClaims";
import MetricCards from "./MetricCards";
import ClaimsTable from "./ClaimsTable";
import ClaimDrawer from "./ClaimDrawer";

const filters = ["All", "True", "False", "Unverified", "Pending"];

export default function ClaimsDashboard() {
  const [selectedClaim, setSelectedClaim] = useState<ClaimRead | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredClaims = mockClaims.filter(
    (claim) =>
      activeFilter === "All" ||
      claim.status === activeFilter ||
      (activeFilter === "Pending" && claim.status === "Pending"),
  );

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-[34px] leading-10 tracking-[-0.02em] text-ink">
            Claims
          </h1>
          <p className="text-body text-ink-muted mt-1">
            Voice notes forwarded for verification
          </p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-badge border border-line bg-surface text-ui font-medium text-ink hover:border-line-strong transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Metrics */}
      <MetricCards />

      {/* Filter Bar */}
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
            1–7 Nov 2026
            <ChevronDown className="w-3.5 h-3.5 text-ink-muted" />
          </button>
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
            <input
              type="text"
              placeholder="Search claims..."
              className="h-9 w-full rounded-badge border border-line bg-surface pl-9 pr-3 text-ui text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 w-full border-t border-line">
        <ClaimsTable
          claims={filteredClaims}
          onSelectClaim={setSelectedClaim}
          selectedId={selectedClaim?.id}
        />
      </div>

      {/* Footer */}
      <div className="w-full border-t border-line py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-caption text-ink-muted mt-auto">
        <div>
          <span className="block">Showing 1–20 of 1,247</span>
          <span className="block text-ink-faint mt-1">
            Volunteer examples, not factual assertions.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-ink transition-colors disabled:opacity-50">
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <button className="flex items-center gap-1 text-ink font-medium hover:text-primary transition-colors">
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drawer */}
      {selectedClaim && (
        <ClaimDrawer
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
          onOverride={(status) =>
            console.log("API Call to /v1/claims/{id} with status:", status)
          }
        />
      )}
    </div>
  );
}
