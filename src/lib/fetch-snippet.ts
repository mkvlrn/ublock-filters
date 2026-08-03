import { URL } from "node:url";
import { errResult, okResult, type ResultAsync } from "@mkvlrn/result";

export async function fetchSnippet(url: string): ResultAsync<string, Error> {
  if (!URL.canParse(url)) {
    return errResult(new Error("invalid url"));
  }

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    return errResult(new Error(`error sending request: ${(error as Error).message}`));
  }
  if (!response.ok) {
    return errResult(new Error("response not OK"));
  }

  if (!response.headers.get("Content-Type")?.includes("text/plain")) {
    return errResult(new Error("wrong content-type"));
  }

  const content = await response.text();

  return okResult(content);
}
