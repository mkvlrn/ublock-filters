import assert from "node:assert/strict";
import { failure, success } from "$/fixtures/fetch-snippet.fixtures";
import { describe, expect, it, vi } from "vite-plus/test";
import { fetchSnippet } from "#/lib/fetch-snippet";

vi.setConfig({
  testTimeout: 1000,
});

describe("valid response", () => {
  it("should return data", async () => {
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(success.response());

    const result = await fetchSnippet("https://someurl.com/valid");

    assert(!result.isError);
    expect(result.value).toStrictEqual(success.expected);
  });
});

describe("error response", () => {
  it.each<(typeof failure)[number]>(failure)("should error -> $error", async (tc) => {
    expect.hasAssertions();
    if (tc.resolve) {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(tc.response);
    } else {
      vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("something broke"));
    }

    const result = await fetchSnippet(tc.url);

    assert(result.isError);
    expect(result.error.message).toStrictEqual(tc.error);
  });
});
