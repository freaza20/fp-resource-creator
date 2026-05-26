type IconProps = {
  className?: string;
};

const iconClasses = (className?: string): string => className ?? "h-4 w-4";

export function DashboardIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={iconClasses(className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-4H4v4Z" />
    </svg>
  );
}

export function ResourceIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={iconClasses(className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M6 3.5h9.5L19 7v13.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5Zm9 0V7h4M8 12h8M8 15h6" />
    </svg>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={iconClasses(className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="m12 3 1.3 4.1L17.5 8l-4.2.9L12 13l-1.3-4.1L6.5 8l4.2-.9L12 3Zm6 10 .8 2.3 2.2.7-2.2.7L18 20l-.8-3.3L15 16l2.2-.7L18 13Z" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={iconClasses(className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.5 19a4.5 4.5 0 0 1 9 0v1h-9v-1Zm10.5 1v-1a6 6 0 0 0-1.1-3.46A3.75 3.75 0 0 1 20.5 19v1H14Z" />
    </svg>
  );
}
