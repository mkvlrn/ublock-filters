import { success } from "$/fixtures/assemble.fixtures";
import { describe, expect, it, vi } from "vite-plus/test";
import { assemble } from "#/lib/assemble";

vi.setConfig({
  testTimeout: 1000,
});

describe("success", () => {
  it("should assemble filters from valid data", () => {
    const result = assemble(success.input);

    expect(result).toEqual(success.expected);
  });
});
