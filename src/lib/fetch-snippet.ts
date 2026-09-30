import { URL } from "node:url";
import { ResultAsync, type ResultAsync as ResultAsyncType } from "@mkvlrn/result";

export async function fetchSnippet(url: string): ResultAsyncType<string, Error> {
  if (!URL.canParse(url)) {
    return ResultAsync.err(new Error("invalid url"));
  }

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    return ResultAsync.err(new Error(`error sending request: ${(error as Error).message}`));
  }
  if (!response.ok) {
    return ResultAsync.err(new Error("response not OK"));
  }

  if (!response.headers.get("Content-Type")?.includes("text/plain")) {
    return ResultAsync.err(new Error("wrong content-type"));
  }

  const content = await response.text();

  return ResultAsync.ok(content);
}
