const ConfidenceMeter = ({
  score,
  status,
}: {
  score: number;
  status: string;
}) => {
  // Based on screenshot, high confidence is green, low/pending is grey
  const isHigh = score >= 0.5 && status !== "Pending";
  const color = isHigh ? "bg-primary" : "bg-line-strong";
  const percent = Math.round(score * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="h-1 w-24 overflow-hidden rounded-full bg-line">
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
      <span className="text-caption text-ink-muted w-8">{percent}%</span>
    </div>
  );
};

export default ConfidenceMeter;
