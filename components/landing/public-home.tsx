"use client";

import Link from "next/link";

import { useSessionStore } from "@/store/useSessionStore";

const features = [
  "Biblioteca editorial FP organizada por familia profesional y nivel.",
  "Generación y adaptación de recursos con IA para A2-low a B1-high.",
  "Tratamiento específico para FP Básica como línea foundation.",
  "Control de uso, coste estimado y revisión docente obligatoria.",
];

const sampleResources = [
  {
    description:
      "Microtarea guiada para reconstruir bases comunicativas en contexto laboral.",
    href: "/samples/fp-basica-pedir-ayuda.md",
    label: "Descargar muestra FP Básica",
    title: "Pedir ayuda en el trabajo",
  },
  {
    description:
      "Modelo de email profesional con tarea escrita para atención al cliente.",
    href: "/samples/grado-medio-responder-queja.md",
    label: "Descargar muestra Grado Medio",
    title: "Responder a una queja",
  },
];

export function PublicHome() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const loginMock = useSessionStore((state) => state.loginMock);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-3" href="/">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-950 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-950">
              TA
            </span>
            <span>
              <span className="block text-sm font-semibold">Aula FP IA</span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                Inglés Profesional para FP
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link
                className="inline-flex h-10 items-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                href="/dashboard"
              >
                Entrar al panel
              </Link>
            ) : (
              <button
                className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                onClick={loginMock}
                type="button"
              >
                Entrar con usuario demo
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            SaaS educativo para profesorado de FP
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            Recursos de Inglés Profesional adaptados a la realidad de Formación
            Profesional.
          </h1>
          <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Crea, adapta y organiza materiales para FP Básica, Grado Medio y
            Grado Superior con situaciones laborales reales: pedidos, quejas,
            citas, soporte técnico, reservas y atención al cliente.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="inline-flex h-10 items-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              href={isAuthenticated ? "/dashboard" : "#muestras"}
            >
              Ver recursos de ejemplo
            </a>
            <Link
              className="inline-flex h-10 items-center rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
              href="/library"
            >
              Biblioteca completa
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20">
          <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            Qué ofrece la app
          </p>
          <div className="mt-4 space-y-3">
            {features.map((feature) => (
              <div
                className="rounded-md border border-zinc-100 p-3 text-sm leading-6 text-zinc-600 dark:border-zinc-900 dark:text-zinc-400"
                key={feature}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        id="muestras"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight">
              Muestras gratuitas
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Puedes descargar ejemplos sin iniciar sesión. La biblioteca
              completa, la generación IA y la adaptación de recursos requieren
              acceso registrado.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {sampleResources.map((sample) => (
              <article
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
                key={sample.title}
              >
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {sample.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {sample.description}
                </p>
                <a
                  className="mt-4 inline-flex h-9 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  download
                  href={sample.href}
                >
                  {sample.label}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-xl font-semibold tracking-tight">
            Acceso freemium con control docente
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            El plan gratuito permitirá explorar parte del banco y probar la IA
            con límites. La verificación de teléfono activará créditos gratuitos
            para reducir cuentas duplicadas y controlar costes.
          </p>
        </div>
      </section>
    </main>
  );
}
