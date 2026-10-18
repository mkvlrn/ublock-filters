import assert from "node:assert/strict";
import { failure, success } from "$/fixtures/parse-snippet.fixtures";
import { describe, expect, it, vi } from "vite-plus/test";
import { parseSnippet } from "#/lib/parse-snippet";

vi.setConfig({
  testTimeout: 1000,
});

describe("valid input", () => {
  it("should parse input", () => {
    expect.hasAssertions();
    const result = parseSnippet(success.input);

    assert(!result.isError);
    expect(result.value).toStrictEqual(success.expected);
  });
});

describe("invalid input", () => {
  it("should fail if input doesn't match regex", () => {
    expect.hasAssertions();
    const result = parseSnippet(failure.input);

    assert(result.isError);
    expect(result.error.message).toStrictEqual(failure.error);
  });
});
