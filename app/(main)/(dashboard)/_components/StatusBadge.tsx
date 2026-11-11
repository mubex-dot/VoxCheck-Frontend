import { Check, X, Clock } from "lucide-react";

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { bg: string; text: string; border: string; icon: any }
  > = {
    True: {
      bg: "bg-accent",
      text: "text-primary",
      border: "border-primary/20",
      icon: Check,
    },
    False: {
      bg: "bg-alert-soft",
      text: "text-alert",
      border: "border-alert/20",
      icon: X,
    },
    Unverified: {
      bg: "bg-surface-sunken",
      text: "text-ink-muted",
      border: "border-line-strong",
      icon: Clock,
    },
    Pending: {
      bg: "bg-transparent",
      text: "text-ink-muted",
      border: "border-dashed border-line-strong",
      icon: Clock,
    },
  };

  const style = styles[status] || styles.Pending;
  const Icon = style.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-badge border ${style.border} ${style.bg} px-2.5 py-1 text-caption font-medium ${style.text}`}
    >
      <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
      {status}
    </div>
  );
};

export default StatusBadge;
