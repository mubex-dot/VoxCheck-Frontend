const MetricCards = ({
  total = 0,
  fakeRate = 0,
  pending = 0,
}: {
  total?: number;
  fakeRate?: number;
  pending?: number;
}) => {
  const fakeRateLabel = fakeRate > 0 ? `${fakeRate}%` : "—";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-card border border-line bg-surface p-5 shadow-card flex flex-col justify-between h-32.5">
        <span className="text-label text-ink-faint uppercase">
          Total claims checked
        </span>
        <span className="text-metric text-ink leading-none mt-2">{total}</span>
        <span className="text-caption text-ink-muted mt-2">
          {total === 0 ? "No claims checked yet" : "Across all verified items"}
        </span>
      </div>

      <div className="rounded-card border border-line bg-surface p-5 shadow-card flex flex-col justify-between h-32.5">
        <span className="text-label text-ink-faint uppercase">Fake rate</span>
        <div className="flex items-center h-11 mt-2">
          <span className="text-metric text-ink leading-none">{fakeRateLabel}</span>
        </div>
        <span className="text-caption text-ink-muted mt-2">
          {fakeRate > 0 ? "Current false-claim share" : "Available after the first check"}
        </span>
      </div>

      <div className="rounded-card border border-line bg-surface p-5 shadow-card flex flex-col justify-between h-32.5">
        <span className="text-label text-ink-faint uppercase">
          Pending review
        </span>
        <span className="text-metric text-ink leading-none mt-2">{pending}</span>
        <span className="text-caption text-ink-muted mt-2">
          {pending === 0 ? "Your review queue is clear" : "Awaiting human verification"}
        </span>
      </div>
    </div>
  );
};

export default MetricCards;
