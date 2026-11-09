import { Download } from "lucide-react";
import MetricCards from "./_components/MetricCards";
import FilterBar from "./_components/FilterBar";
import EmptyState from "./_components/EmptyState";
import DashboardFooter from "./_components/DashboardFooter";

const ClaimsDashboardPage = () => {
  return (
    <div className="flex flex-col h-full">
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
      <div className="mt-6">
        <FilterBar />
      </div>

      {/* Table / Empty State Container */}
      <div className="flex-1 w-full border-t border-line mt-4">
        <EmptyState />
      </div>

      {/* Footer pushed to bottom */}
      <DashboardFooter />
    </div>
  );
};

export default ClaimsDashboardPage;
