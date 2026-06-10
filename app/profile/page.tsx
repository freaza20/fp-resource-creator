import { Sidebar } from "@/components/layout/sidebar";
import { ProfileWorkspace } from "@/components/profile/profile-workspace";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar activeSection="profile" />

        <main className="flex-1">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <ProfileWorkspace />
          </div>
        </main>
      </div>
    </div>
  );
}
