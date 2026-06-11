import { PrivateRoute } from "@/components/auth/private-route";
import { LibraryWorkspace } from "@/components/library/library-workspace";
import { Sidebar } from "@/components/layout/sidebar";
import {
  approvedResourceBankItems,
  resourceBankCoverage,
  resourceBankStats,
} from "@/lib/resource-bank/approved-resource-bank";

const featuredFilters = [
  "Administración y Gestión",
  "Comercio y Marketing",
  "Informática y Comunicaciones",
  "Hostelería y Turismo",
  "Imagen Personal",
];

export default function LibraryPage() {
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar activeSection="library" />

        <main className="flex-1">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20">
              <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
                <div className="space-y-4">
                  <div className="inline-flex rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
                    Banco FP revisado
                  </div>
                  <div className="space-y-2">
                    <h1 className="max-w-3xl text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
                      Biblioteca de recursos profesionales para inglés de FP
                    </h1>
                    <p className="max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      Recursos aprobados y clasificados por familia profesional,
                      nivel lingüístico, situación laboral y foco comunicativo.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <LibraryMetric label="Recursos" value={resourceBankStats.total} />
                  <LibraryMetric label="Familias" value={resourceBankStats.families} />
                  <LibraryMetric label="Niveles" value={resourceBankStats.levels} />
                  <LibraryMetric label="Tipos" value={resourceBankStats.resourceTypes} />
                </div>
              </div>
            </section>

            <section className="flex flex-wrap gap-2" aria-label="Familias destacadas">
              {featuredFilters.map((filter) => (
                <span
                  className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 shadow-sm shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:shadow-black/20"
                  key={filter}
                >
                  {filter}
                </span>
              ))}
            </section>

            <LibraryWorkspace
              coverage={resourceBankCoverage}
              items={approvedResourceBankItems}
            />
          </div>
        </main>
      </div>
      </div>
    </PrivateRoute>
  );
}

function LibraryMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
      <p className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
        {value}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
        {label}
      </p>
    </div>
  );
}
