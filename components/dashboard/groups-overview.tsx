"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGeneratorStore } from "@/store/useGeneratorStore";
import { useGroupsStore } from "@/store/useGroupsStore";

export function GroupsOverview() {
  const groups = useGroupsStore((state) => state.groups);
  const selectedGroup = useGroupsStore((state) => state.selectedGroup);
  const selectGroup = useGroupsStore((state) => state.selectGroup);
  const setSelectedGeneratorGroup = useGeneratorStore(
    (state) => state.setSelectedGroup,
  );
  const setSelectedLevel = useGeneratorStore((state) => state.setSelectedLevel);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grupos FP activos</CardTitle>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Vista rápida de ciclos, familias profesionales y subniveles.
        </p>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {groups.map((group) => {
          const isSelected = selectedGroup?.id === group.id;

          return (
            <button
              className={`rounded-md border p-3 text-left transition-colors ${
                isSelected
                  ? "border-zinc-950 bg-zinc-50 dark:border-zinc-50 dark:bg-zinc-900"
                  : "border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/60"
              }`}
              key={group.id}
              onClick={() => {
                selectGroup(group.id);
                setSelectedGeneratorGroup(group);
                setSelectedLevel(group.languageLevel);
              }}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    {group.name}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {group.professionalFamily}
                  </p>
                </div>
                <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {group.languageLevel}
                </span>
              </div>
              <p className="mt-3 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                {group.vocationalLevel} · {group.cycleName}
                <br />
                Editorial: {group.publisher}
              </p>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
