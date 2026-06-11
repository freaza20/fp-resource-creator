"use client";

import Link from "next/link";

import { useSessionStore } from "@/store/useSessionStore";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const loginMock = useSessionStore((state) => state.loginMock);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl items-center">
        <section className="w-full rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20 sm:p-8">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Área privada
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
            Inicia sesión para acceder a la biblioteca completa y a la IA.
          </h1>
          <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            En esta fase seguimos usando sesión demo. Supabase Auth sustituirá
            este acceso cuando conectemos autenticación real.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              onClick={loginMock}
              type="button"
            >
              Entrar con usuario demo
            </button>
            <Link
              className="inline-flex h-10 items-center rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
              href="/"
            >
              Volver a la página pública
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
