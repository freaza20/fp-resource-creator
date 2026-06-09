import {
  languageSublevels,
  professionalFamilies,
  resourceTypes,
} from "@/lib/resource-bank/constants";
import type {
  ResourceBankCoverageCell,
  ResourceBankCoverageSummary,
  ResourceBankItem,
} from "@/types/resource-bank";
import type { LanguageSublevel, ProfessionalFamily } from "@/types/vocational";

const countBy = <T extends string>(
  values: readonly T[],
  items: ResourceBankItem[],
  selector: (item: ResourceBankItem) => T,
): Array<{ value: T; count: number }> =>
  values.map((value) => ({
    value,
    count: items.filter((item) => selector(item) === value).length,
  }));

export function calculateResourceBankCoverage(
  items: ResourceBankItem[],
): ResourceBankCoverageSummary {
  const coverageByFamily = countBy(
    professionalFamilies,
    items,
    (item) => item.professionalFamily,
  ).map(({ value, count }) => ({
    professionalFamily: value,
    count,
  }));

  const coverageByLevel = countBy(
    languageSublevels,
    items,
    (item) => item.languageLevel,
  ).map(({ value, count }) => ({
    languageLevel: value,
    count,
  }));

  const coverageByResourceType = countBy(
    resourceTypes,
    items,
    (item) => item.type,
  ).map(({ value, count }) => ({
    type: value,
    count,
  }));

  const matrix: ResourceBankCoverageCell[] = professionalFamilies.flatMap(
    (professionalFamily: ProfessionalFamily) =>
      languageSublevels.map((languageLevel: LanguageSublevel) => ({
        professionalFamily,
        languageLevel,
        count: items.filter(
          (item) =>
            item.professionalFamily === professionalFamily &&
            item.languageLevel === languageLevel,
        ).length,
      })),
  );

  return {
    totalResources: items.length,
    totalFamilies: professionalFamilies.length,
    coveredFamilies: coverageByFamily.filter((entry) => entry.count > 0).length,
    uncoveredFamilies: coverageByFamily
      .filter((entry) => entry.count === 0)
      .map((entry) => entry.professionalFamily),
    coverageByFamily,
    coverageByLevel,
    coverageByResourceType,
    matrix,
  };
}
