"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { planDefinitions } from "@/lib/mock-data/billing";
import {
  canUseAiGeneration,
  createUsageRows,
  getPlanDefinition,
  getUsagePercentage,
} from "@/lib/billing/usage";
import { useSessionStore } from "@/store/useSessionStore";
import type { PlanDefinition } from "@/types/billing";

export function ProfileWorkspace() {
  const currentUser = useSessionStore((state) => state.currentUser);
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const loginMock = useSessionStore((state) => state.loginMock);
  const logoutMock = useSessionStore((state) => state.logoutMock);
  const verifyPhoneMock = useSessionStore((state) => state.verifyPhoneMock);
  const upgradePlanMock = useSessionStore((state) => state.upgradePlanMock);

  if (!isAuthenticated || !currentUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sesión no iniciada</CardTitle>
          <CardDescription>
            Esta pantalla simula el acceso de usuario hasta conectar Supabase
            Auth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <button
            className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            onClick={loginMock}
            type="button"
          >
            Entrar con usuario demo
          </button>
        </CardContent>
      </Card>
    );
  }

  const plan = getPlanDefinition(currentUser.plan);
  const usageRows = createUsageRows(currentUser.usage, plan);
  const canUseAi = canUseAiGeneration(currentUser);

  return (
    <>
      <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="space-y-3">
            <div className="inline-flex rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
              Perfil de usuario
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
                {currentUser.fullName}
              </h1>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {currentUser.email} · {currentUser.schoolName}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Plan actual
            </p>
            <p className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
              {plan.name}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {plan.priceLabel}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Estado freemium</CardTitle>
            <CardDescription>
              El teléfono se usará para activar créditos gratuitos de IA y
              reducir cuentas duplicadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerificationRow
              description={currentUser.email}
              label="Email verificado"
              status={currentUser.verification.emailVerified}
            />
            <VerificationRow
              description={currentUser.phone ?? "Teléfono pendiente"}
              label="Teléfono verificado"
              status={currentUser.verification.phoneVerified}
            />

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
              <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                {canUseAi
                  ? "Créditos IA gratuitos activos"
                  : "Verifica el teléfono para activar la IA gratuita"}
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                En el plan gratuito, la IA tiene límite mensual y requiere
                teléfono verificado antes de consumir coste real.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                disabled={currentUser.verification.phoneVerified}
                onClick={verifyPhoneMock}
                type="button"
              >
                Verificar teléfono demo
              </button>
              <button
                className="h-10 rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                onClick={() => upgradePlanMock("pro")}
                type="button"
              >
                Simular plan Pro
              </button>
              <button
                className="h-10 rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                onClick={logoutMock}
                type="button"
              >
                Cerrar sesión demo
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uso del periodo</CardTitle>
            <CardDescription>
              Periodo {currentUser.usage.billingPeriod}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {usageRows.map((row) => (
              <UsageBar
                key={row.label}
                label={row.label}
                limit={row.limit}
                used={row.used}
              />
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {planDefinitions.map((item) => (
          <PlanCard
            active={item.id === currentUser.plan}
            key={item.id}
            plan={item}
          />
        ))}
      </section>
    </>
  );
}

function VerificationRow({
  description,
  label,
  status,
}: {
  description: string;
  label: string;
  status: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div>
        <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
          {label}
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <span
        className={`rounded-md px-2 py-1 text-xs font-medium ${
          status
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
            : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
        }`}
      >
        {status ? "Verificado" : "Pendiente"}
      </span>
    </div>
  );
}

function UsageBar({
  label,
  limit,
  used,
}: {
  label: string;
  limit: number;
  used: number;
}) {
  const percentage = getUsagePercentage(used, limit);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-zinc-700 dark:text-zinc-200">
          {label}
        </span>
        <span className="text-zinc-500 dark:text-zinc-400">
          {used}/{limit}
        </span>
      </div>
      <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-900">
        <div
          className="h-2 rounded-full bg-zinc-950 dark:bg-zinc-50"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PlanCard({
  active,
  plan,
}: {
  active: boolean;
  plan: PlanDefinition;
}) {
  return (
    <Card className={active ? "border-zinc-950 dark:border-zinc-50" : undefined}>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{plan.name}</CardTitle>
          {active ? (
            <span className="rounded-md bg-zinc-950 px-2 py-1 text-xs font-medium text-white dark:bg-zinc-50 dark:text-zinc-950">
              Actual
            </span>
          ) : null}
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          {plan.priceLabel}
        </p>
      </CardContent>
    </Card>
  );
}
