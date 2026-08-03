import { describe, expect, test } from "bun:test";
import { assemble } from "#/lib/assemble";
import { success } from "$/fixtures/assemble.fixtures";

describe("success", () => {
  test("should assemble filters from valid data", () => {
    const result = assemble(success.input);

    expect(result).toEqual(success.expected);
  });
});
