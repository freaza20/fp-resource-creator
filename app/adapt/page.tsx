import { AdaptWorkspace } from "@/components/adapt/adapt-workspace";
import { PrivateRoute } from "@/components/auth/private-route";
import { Sidebar } from "@/components/layout/sidebar";

export default function AdaptPage() {
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar activeSection="adapt" />

        <main className="flex-1">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <AdaptWorkspace />
          </div>
        </main>
      </div>
      </div>
    </PrivateRoute>
  );
}
