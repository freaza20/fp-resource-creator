import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const joinClasses = (...classes: Array<string | undefined>): string =>
  classes.filter(Boolean).join(" ");

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={joinClasses(
        "rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div className={joinClasses("space-y-1.5 p-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: CardProps) {
  return (
    <h2
      className={joinClasses(
        "text-sm font-semibold text-zinc-950 dark:text-zinc-50",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function CardDescription({ children, className, ...props }: CardProps) {
  return (
    <p
      className={joinClasses("text-sm text-zinc-500 dark:text-zinc-400", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }: CardProps) {
  return (
    <div className={joinClasses("p-5 pt-0", className)} {...props}>
      {children}
    </div>
  );
}
