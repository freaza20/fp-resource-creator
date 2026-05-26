import {
  defaultGenerationOptions,
  generateResource,
} from "@/lib/ai/resource-generator";
import type { GrammarTopic } from "@/types/grammar";
import type { StudentGroup } from "@/types/group";
import type { TeachingResource, ResourceType } from "@/types/resource";
import type { LanguageSublevel } from "@/types/vocational";
import type { VocabularySet } from "@/types/vocabulary";

type MockGeneratorInput = {
  group: StudentGroup | null;
  level: LanguageSublevel;
  grammar: GrammarTopic | null;
  vocabulary: VocabularySet | null;
  resourceType: ResourceType;
};

export async function generateMockResource(
  input: MockGeneratorInput,
): Promise<TeachingResource> {
  const response = await generateResource({
    ...input,
    options: defaultGenerationOptions,
  });

  return response.resource;
}
