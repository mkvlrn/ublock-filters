import type { FilterMap } from "#/lib/parse-snippet";

export const success: { input: string; expected: FilterMap } = {
  input: `
---fixed:start---
fixed1
fixed2
---fixed:end---
---masks:start---
masks1(%s)
masks2(%s)
---masks:end---
---filters:start---
filters1
filters2
---filters:end---`,
  expected: new Map([
    ["fixed", ["fixed1", "fixed2"]],
    ["masks", ["masks1(%s)", "masks2(%s)"]],
    ["filters", ["filters1", "filters2"]],
  ]),
};

export const failure: { input: string; error: string } = {
  input: "invalid input",
  error: "input does not match the correct format",
};
