type NavigationItem = {
  label: string;
  href: string;
  icon: keyof typeof icons;
  active?: boolean;
};

const icons = {
  dashboard: (
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h3A1.5 1.5 0 0 1 10 5.5v3A1.5 1.5 0 0 1 8.5 10h-3A1.5 1.5 0 0 1 4 8.5v-3Zm10 0A1.5 1.5 0 0 1 15.5 4h3A1.5 1.5 0 0 1 20 5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 14 8.5v-3ZM4 15.5A1.5 1.5 0 0 1 5.5 14h3a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3Zm10 0a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3Z" />
  ),
  groups: (
    <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.5 19a4.5 4.5 0 0 1 9 0v1h-9v-1Zm10.5 1v-1a6 6 0 0 0-1.1-3.46A3.75 3.75 0 0 1 20.5 19v1H14Z" />
  ),
  resources: (
    <path d="M6 3.5h9.5L19 7v13.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5Zm9 0V7h4M8 11h8M8 14h8M8 17h5" />
  ),
  generator: (
    <path d="m12 3 1.3 4.1L17.5 8l-4.2.9L12 13l-1.3-4.1L6.5 8l4.2-.9L12 3Zm6 9 .8 2.3 2.2.7-2.2.7L18 19l-.8-2.3L15 16l2.2-.7L18 12ZM6 13l.7 2.1 2.3.9-2.3.9L6 19l-.7-2.1L3 16l2.3-.9L6 13Z" />
  ),
  library: (
    <path d="M5 4.5h10A2.5 2.5 0 0 1 17.5 7v13H7A2.5 2.5 0 0 1 4.5 17.5v-13H5Zm2.5 0v13A2.5 2.5 0 0 0 10 20M8 8h6M8 11h6" />
  ),
  settings: (
    <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8 3.5a7.8 7.8 0 0 0-.1-1.2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-2-1.1L15.2 3h-4.4l-.3 2.3a8 8 0 0 0-2 1.1l-2.4-1-2 3.4 2 1.5A7.8 7.8 0 0 0 6 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 2 1.1l.3 2.3h4.4l.3-2.3a8 8 0 0 0 2-1.1l2.4 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" />
  ),
};

const navigationItems: NavigationItem[] = [
  { label: "Dashboard", href: "#dashboard", icon: "dashboard", active: true },
  { label: "Groups", href: "#groups", icon: "groups" },
  { label: "Resources", href: "#resources", icon: "resources" },
  { label: "Generator", href: "#generator", icon: "generator" },
  { label: "Library", href: "#library", icon: "library" },
  { label: "Settings", href: "#settings", icon: "settings" },
];

function SidebarIcon({ name }: { name: NavigationItem["icon"] }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {icons[name]}
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="flex border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 lg:min-h-screen lg:w-72 lg:flex-col lg:border-r">
      <div className="flex w-full items-center justify-between gap-4 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800 lg:flex-col lg:items-stretch lg:justify-start lg:border-b-0 lg:px-5 lg:py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-950 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-950">
            TA
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              Teacher AI
            </p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              English for FP
            </p>
          </div>
        </div>

        <nav className="hidden gap-1 lg:flex lg:flex-col" aria-label="Principal">
          {navigationItems.map((item) => (
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              }`}
              href={item.href}
              key={item.label}
            >
              <SidebarIcon name={item.icon} />
              {item.label}
            </a>
          ))}
        </nav>

        <nav
          className="flex gap-1 overflow-x-auto lg:hidden"
          aria-label="Principal móvil"
        >
          {navigationItems.slice(0, 4).map((item) => (
            <a
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors ${
                item.active
                  ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              }`}
              href={item.href}
              key={item.label}
              title={item.label}
            >
              <SidebarIcon name={item.icon} />
              <span className="sr-only">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-auto hidden border-t border-zinc-200 p-5 dark:border-zinc-800 lg:block">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
          <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
            FP-first
          </p>
          <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            Recursos por familia profesional, subnivel y situación laboral.
          </p>
        </div>
      </div>
    </aside>
  );
}
