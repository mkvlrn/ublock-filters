import { errResult, okResult, type Result } from "@mkvlrn/result";

export type FilterMap = Map<"fixed" | "masks" | "filters", string[]>;

const SNIPPET_REGEX =
  /^---fixed:start---\n([\s\S]*?)\n---fixed:end---\n---masks:start---\n([\s\S]*?)\n---masks:end---\n---filters:start---\n([\s\S]*?)\n---filters:end---$/;
const BOM = /^\uFEFF/;

export function parseSnippet(snippet: string): Result<FilterMap, Error> {
  const match = snippet.replace(BOM, "").replace(/\r\n/g, "\n").trim().match(SNIPPET_REGEX);

  if (!match) {
    return errResult(new Error("input does not match the correct format"));
  }

  const [, fixed = "", masks = "", filters = ""] = match;
  const matches: FilterMap = new Map([
    ["fixed", fixed.split("\n")],
    ["masks", masks.split("\n")],
    ["filters", filters.split("\n")],
  ]);

  return okResult(matches);
}
