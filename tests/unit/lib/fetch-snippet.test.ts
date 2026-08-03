import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import assert from "node:assert/strict";
import { fetchSnippet } from "#/lib/fetch-snippet";
import { failure, success } from "$/fixtures/fetch-snippet.fixtures";

afterEach(() => {
  mock.restore();
});

describe("success", () => {
  test("should return data", async () => {
    spyOn(globalThis, "fetch").mockResolvedValue(success.response());

    const result = await fetchSnippet("https://someurl.com/valid");

    assert(!result.isError);
    expect(result.value).toEqual(success.expected);
  });
});

describe("failure", () => {
  test.each<(typeof failure)[number]>(failure)("should error -> $error", async (tc) => {
    if (tc.resolve) {
      spyOn(globalThis, "fetch").mockResolvedValue(tc.response);
    } else {
      spyOn(globalThis, "fetch").mockRejectedValue(new Error("something broke"));
    }

    const result = await fetchSnippet(tc.url);

    assert(result.isError);
    expect(result.error.message).toEqual(tc.error);
  });
});
