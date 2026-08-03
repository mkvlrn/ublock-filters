import type { FilterMap } from "#/lib/parse-snippet";

export function assemble(data: FilterMap): string {
  let result = `!CRAP-BLOCKER

${data.get("fixed")?.join("\n")}

`;

  for (const filter of data.get("filters") || []) {
    for (const mask of data.get("masks") || []) {
      result += `${mask.replace("%s", filter)}\n`;
    }
  }

  return result;
}
