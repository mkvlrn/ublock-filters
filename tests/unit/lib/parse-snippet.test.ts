import { describe, expect, test } from "bun:test";
import assert from "node:assert/strict";
import { parseSnippet } from "#/lib/parse-snippet";
import { failure, success } from "$/fixtures/parse-snippet.fixtures";

describe("success", () => {
  test("should parse input", () => {
    const result = parseSnippet(success.input);

    assert(!result.isError);
    expect(result.value).toStrictEqual(success.expected);
  });
});

describe("failure", () => {
  test("should fail if input doesn't match regex", () => {
    const result = parseSnippet(failure.input);

    assert(result.isError);
    expect(result.error.message).toEqual(failure.error);
  });
});
