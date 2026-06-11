import { AIEvaluationWorkspace } from "@/components/ai-evaluation/ai-evaluation-workspace";
import { Sidebar } from "@/components/layout/sidebar";

export default function AIEvaluationPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar activeSection="ai-evaluation" />

        <main className="flex-1">
          <AIEvaluationWorkspace />
        </main>
      </div>
    </div>
  );
}
