import Link from "next/link";
import {
  FileText,
  AudioLines,
  Users,
  Settings,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { label: "Claims", href: "/", icon: FileText, active: true },
  { label: "Sources", href: "/sources", icon: AudioLines, active: false },
  { label: "Team", href: "/team", icon: Users, active: false },
  { label: "Settings", href: "/settings", icon: Settings, active: false },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-65 border-r border-line bg-surface flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="p-6 pb-8">
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            VoxCheck
          </h1>
          <p className="text-[10px] tracking-widest uppercase text-ink-muted mt-1 font-medium">
            Civic Verification Desk
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-ui transition-colors ${
                item.active
                  ? "border-l-[3px] border-primary bg-accent text-primary font-medium"
                  : "border-l-[3px] border-transparent text-ink-muted hover:bg-surface-sunken hover:text-ink"
              }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div>
        <div className="px-6 py-4">
          <p className="text-[10px] tracking-widest uppercase text-ink-faint font-medium mb-2">
            Built on evidence
          </p>
          <p className="text-caption text-ink-muted leading-relaxed">
            Check the source.
            <br />
            Give the facts a voice.
          </p>
        </div>

        <div className="border-t border-line p-4 flex items-center justify-between cursor-pointer hover:bg-surface-sunken transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-surface-sunken border border-line flex items-center justify-center text-sm font-medium text-ink-muted">
              AO
            </div>
            <div>
              <p className="text-sm font-medium text-ink">Reviewer</p>
              <p className="text-[11px] text-ink-muted">Volunteer desk</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-ink-faint" />
        </div>
      </div>
    </aside>
  );
}
