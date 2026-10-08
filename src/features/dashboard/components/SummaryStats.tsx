import { CarFront, CircleDollarSign, MapPin, UsersRound } from "lucide-react";

import type { DashboardStats } from "../dashboard.types";

interface SummaryStatsProps {
  stats: DashboardStats;
}

const SummaryStats = ({ stats }: SummaryStatsProps) => {
  const cards = [
    {
      title: "Total Passengers",
      value: stats.totalPassengers.toLocaleString(),
      trend: "+23% from last week",
      icon: UsersRound,
      iconClass: "bg-dashboard-purple",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      trend: "+15% from yesterday",
      icon: CircleDollarSign,
      iconClass: "bg-dashboard-yellow",
    },
    {
      title: "Total Rides",
      value: stats.totalRides.toLocaleString(),
      trend: "+12% from yesterday",
      icon: MapPin,
      iconClass: "bg-dashboard-green",
    },
    {
      title: "Total Drivers",
      value: stats.totalDrivers.toLocaleString(),
      trend: "+8% from yesterday",
      icon: CarFront,
      iconClass: "bg-dashboard-cyan",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="min-h-[186px] rounded-xl border border-text-primary bg-surface p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xl font-medium leading-7 text-text-primary">
                  {card.title}
                </p>

                <p className="mt-3 text-4xl font-bold tracking-tight text-text-primary">
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <Icon size={30} strokeWidth={1.8} className="text-surface" />
              </div>
            </div>

            <p className="mt-7 text-base font-medium text-success">
              {card.trend}
            </p>
          </article>
        );
      })}
    </div>
  );
};

export default SummaryStats;
