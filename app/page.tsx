"use client";

import { RecentResources } from "@/components/dashboard/recent-resources";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { GenerationMonitor } from "@/components/dashboard/generation-monitor";
import { GroupsOverview } from "@/components/dashboard/groups-overview";
import { QuickGenerator } from "@/components/dashboard/quick-generator";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Sidebar } from "@/components/layout/sidebar";
import {
  DashboardIcon,
  ResourceIcon,
  SparkIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { useResourceGeneration } from "@/hooks/useResourceGeneration";
import { defaultGenerationOptions } from "@/lib/ai/resource-generator";
import { grammarTopics } from "@/lib/mock-data/grammar";
import { professionalFamilies } from "@/lib/mock-data/professional-families";
import { vocabularySets } from "@/lib/mock-data/vocabulary";
import { useGeneratorStore } from "@/store/useGeneratorStore";
import { useGroupsStore } from "@/store/useGroupsStore";
import { useResourcesStore } from "@/store/useResourcesStore";
import { useSessionStore } from "@/store/useSessionStore";

export default function Home() {
  const groups = useGroupsStore((state) => state.groups);
  const resources = useResourcesStore((state) => state.resources);
  const addResource = useResourcesStore((state) => state.addResource);
  const currentUser = useSessionStore((state) => state.currentUser);
  const consumeAiGenerationMock = useSessionStore(
    (state) => state.consumeAiGenerationMock,
  );
  const {
    error: generationError,
    generate,
    isLoading: isGenerating,
    response: generationResponse,
    status: generationStatus,
  } = useResourceGeneration();
  const selectedGroup = useGeneratorStore((state) => state.selectedGroup);
  const selectedLevel = useGeneratorStore((state) => state.selectedLevel);
  const selectedGrammar = useGeneratorStore((state) => state.selectedGrammar);
  const selectedVocabulary = useGeneratorStore(
    (state) => state.selectedVocabulary,
  );
  const selectedResourceType = useGeneratorStore(
    (state) => state.selectedResourceType,
  );

  const generatedResources = resources.filter(
    (resource) =>
      resource.id.startsWith("generated-") ||
      resource.id.startsWith("mistral-"),
  ).length;
  const currentGroup = selectedGroup ?? groups[0] ?? null;
  const currentGrammar = selectedGrammar ?? grammarTopics[0] ?? null;
  const currentVocabulary = selectedVocabulary ?? vocabularySets[0] ?? null;
  const currentResourceType = selectedResourceType ?? "reading";
  const currentLevel = selectedLevel ?? currentGroup?.languageLevel ?? "A2";

  const handleGenerateResource = async () => {
    const response = await generate(
      {
        group: currentGroup,
        level: currentLevel,
        grammar: currentGrammar,
        vocabulary: currentVocabulary,
        resourceType: currentResourceType,
        options: defaultGenerationOptions,
      },
      currentUser,
    );

    if (response) {
      consumeAiGenerationMock();
      addResource(response.resource);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />

        <main className="flex-1" id="dashboard">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
              <DashboardHero
                activeGroupName={currentGroup?.name ?? "Sin grupo seleccionado"}
                generationError={generationError}
                grammarTitle={currentGrammar?.title ?? "Gramática pendiente"}
                isGenerating={isGenerating}
                onGenerateResource={handleGenerateResource}
                vocabularyTitle={currentVocabulary?.title ?? "Sin set seleccionado"}
              />

              <QuickGenerator />
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatsCard
                description="Grupos de FP listos para materiales contextualizados."
                icon={<UsersIcon />}
                title="Grupos FP"
                tone="blue"
                value={groups.length}
              />
              <StatsCard
                description="Materiales profesionales disponibles en la biblioteca."
                icon={<ResourceIcon />}
                title="Recursos"
                tone="emerald"
                value={resources.length}
              />
              <StatsCard
                description="Recursos creados desde la arquitectura IA simulada."
                icon={<SparkIcon />}
                title="Generados"
                tone="amber"
                value={generatedResources}
              />
              <StatsCard
                description="Áreas profesionales cubiertas en el MVP inicial."
                icon={<DashboardIcon />}
                title="Familias"
                value={professionalFamilies.length}
              />
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_420px]">
              <div id="resources">
                <RecentResources />
              </div>
              <div className="space-y-4">
                <GenerationMonitor
                  error={generationError}
                  response={generationResponse}
                  status={generationStatus}
                />
                <div id="groups">
                <GroupsOverview />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
