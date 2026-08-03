import { success as parseSuccess } from "$/fixtures/parse-snippet.fixtures";

export const success = {
  input: parseSuccess.expected,
  expected: `!CRAP-BLOCKER

fixed1
fixed2

masks1(filters1)
masks2(filters1)
masks1(filters2)
masks2(filters2)
`,
};
