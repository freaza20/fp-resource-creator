import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

type StatsCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  tone?: "zinc" | "emerald" | "blue" | "amber";
};

const toneClasses = {
  zinc: "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
  emerald:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
};

export function StatsCard({
  title,
  value,
  description,
  icon,
  tone = "zinc",
}: StatsCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <p className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {value}
          </p>
        </div>
        <div className={`rounded-md p-2.5 ${toneClasses[tone]}`}>{icon}</div>
      </div>
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </Card>
  );
}
