import {
  BellRing,
  Send,
  CircleAlert,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

interface NotificationStat {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  valueClassName: string;
}

const notificationStats: NotificationStat[] = [
  {
    id: "active-templates",
    title: "Active Templates",
    value: "84",
    description: "Including 10 drafts ready to launch",
    icon: BellRing,
    valueClassName: "text-brand-primary",
  },
  {
    id: "notifications-sent",
    title: "Notifications sent Today",
    value: "214,380",
    description: "+7.9% vs yesterday",
    icon: Send,
    valueClassName: "text-brand-primary",
  },
  {
    id: "failure-rate",
    title: "Failure Rate",
    value: "1.8%",
    description: "3,854 failed sends — SMS dominates failures",
    icon: CircleAlert,
    valueClassName: "text-[#B78A6B]",
  },
  {
    id: "most-used-channels",
    title: "Most Used Channels",
    value: "In-app",
    description: "64% in-app · 21% push · 9% SMS · 6% email",
    icon: Smartphone,
    valueClassName: "text-brand-primary",
  },
];

export default function NotificationStats() {
  return (
    <section
      aria-label="Notification statistics"
      className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4"
    >
      {notificationStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.id}
            className="
              group min-w-0 cursor-pointer rounded-xl
              border border-border bg-white p-5 sm:p-6
              transition-all duration-200 ease-in-out
              hover:border-[#1F9686]/30
              hover:bg-[#1F9686]/[0.10]
              hover:shadow-sm
              focus-within:border-brand-primary
              focus-within:ring-2
              focus-within:ring-brand-primary/15
            "
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-semibold leading-5 text-text-primary sm:text-base">
                {stat.title}
              </h2>

              <span
                className="
                  flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-lg bg-transparent text-text-secondary
                  transition-colors duration-200
                  group-hover:bg-white/80
                  group-hover:text-brand-primary
                "
              >
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              </span>
            </div>

            <p
              className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${stat.valueClassName}`}
            >
              {stat.value}
            </p>

            <p className="mt-3 text-sm leading-5 text-text-secondary">
              {stat.description}
            </p>
          </article>
        );
      })}
    </section>
  );
}
