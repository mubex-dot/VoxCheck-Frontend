import { Search } from "lucide-react";

const filters = ["All", "True", "False", "Unverified", "Pending"];

const FilterBar = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Segmented Control */}
      <div className="inline-flex items-center rounded-badge border border-line bg-surface overflow-hidden">
        {filters.map((filter, i) => (
          <button
            key={filter}
            className={`px-4 py-1.5 text-ui font-medium transition-colors ${
              i === 0
                ? "bg-accent text-primary"
                : "text-ink-muted hover:bg-surface-sunken hover:text-ink"
            } ${i !== filters.length - 1 ? "border-r border-line" : ""}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-70">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
        <input
          type="text"
          placeholder="Search claims..."
          className="h-9 w-full rounded-badge border border-line bg-surface pl-9 pr-3 text-ui text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
};

export default FilterBar;
