const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1 */}
      <div className="rounded-card border border-line bg-surface p-5 shadow-card flex flex-col justify-between h-32.5">
        <span className="text-label text-ink-faint uppercase">
          Total claims checked
        </span>
        <span className="text-metric text-ink leading-none mt-2">0</span>
        <span className="text-caption text-ink-muted mt-2">
          No claims checked yet
        </span>
      </div>

      {/* Card 2 */}
      <div className="rounded-card border border-line bg-surface p-5 shadow-card flex flex-col justify-between h-32.5">
        <span className="text-label text-ink-faint uppercase">Fake rate</span>
        <div className="flex items-center h-11 mt-2">
          <div className="w-12 h-1.5 bg-primary rounded-full" />
        </div>
        <span className="text-caption text-ink-muted mt-2">
          Available after the first check
        </span>
      </div>

      {/* Card 3 */}
      <div className="rounded-card border border-line bg-surface p-5 shadow-card flex flex-col justify-between h-32.5">
        <span className="text-label text-ink-faint uppercase">
          Pending review
        </span>
        <span className="text-metric text-ink leading-none mt-2">0</span>
        <span className="text-caption text-ink-muted mt-2">
          Your review queue is clear
        </span>
      </div>
    </div>
  );
};

export default MetricCards;
