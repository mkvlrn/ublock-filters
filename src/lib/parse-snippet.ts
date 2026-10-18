import { Result, type Result as ResultType } from "@mkvlrn/result";

type FilterMap = Map<"fixed" | "masks" | "filters", string[]>;

const SNIPPET_REGEX =
  /^---fixed:start---\n(?<fixed>[\s\S]*?)\n---fixed:end---\n---masks:start---\n(?<masks>[\s\S]*?)\n---masks:end---\n---filters:start---\n(?<filters>[\s\S]*?)\n---filters:end---$/;
const BOM = /^\uFEFF/;

function parseSnippet(snippet: string): ResultType<FilterMap, Error> {
  const match = SNIPPET_REGEX.exec(snippet.replace(BOM, "").replace(/\r\n/g, "\n").trim());

  if (!match) {
    return Result.err(new Error("input does not match the correct format"));
  }

  const { fixed = "", masks = "", filters = "" } = match.groups ?? {};
  const matches: FilterMap = new Map([
    ["fixed", fixed.split("\n")],
    ["masks", masks.split("\n")],
    ["filters", filters.split("\n")],
  ]);

  return Result.ok(matches);
}

export { parseSnippet, type FilterMap };
