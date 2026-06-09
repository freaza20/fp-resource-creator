import type { ResourceBankItem } from "@/types/resource-bank";
import type { TeachingResource } from "@/types/resource";

const summarizeContent = (item: ResourceBankItem): string => {
  const firstSection = item.content.sections[0];
  const firstTask = firstSection?.tasks?.[0];

  return [
    item.content.studentInstructions,
    firstSection ? `${firstSection.title}: ${firstSection.body}` : undefined,
    firstTask ? `Task: ${firstTask}` : undefined,
  ]
    .filter(Boolean)
    .join(" ");
};

export function mapBankItemToResource(item: ResourceBankItem): TeachingResource {
  return {
    id: item.id,
    title: item.title,
    type: item.type,
    professionalFamily: item.professionalFamily,
    vocationalLevel: item.vocationalLevel,
    languageLevel: item.languageLevel,
    scenario: item.scenario,
    skillFocus: item.skillFocus,
    content: summarizeContent(item),
    createdAt: item.source.createdAt,
  };
}
